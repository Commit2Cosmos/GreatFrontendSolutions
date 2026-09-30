interface IEventEmitter {
  on(eventName: string, listener: Function): IEventEmitter;
  off(eventName: string, listener: Function): IEventEmitter;
  emit(eventName: string, ...args: Array<any>): boolean;
}

export default class EventEmitter implements IEventEmitter {
  private event_map = new Map<string, Function[]>;

  constructor() {
    this.event_map = new Map();
  }

  on(eventName: string, listener: Function): IEventEmitter {
    if (!this.event_map.has(eventName)) {
      this.event_map.set(eventName, []);
    }
    
    this.event_map.get(eventName)!.push(listener);

    return this;
  }

  off(eventName: string, listener: Function): IEventEmitter {
    if (this.event_map.has(eventName)) {
      const i = this.event_map.get(eventName)!.lastIndexOf(listener);
      if (i !== -1) this.event_map.get(eventName)!.splice(i, 1);
      if (this.event_map.get(eventName)!.length == 0) {
        this.event_map.delete(eventName);
      }
    }

    return this;
  }

  emit(eventName: string, ...args: Array<any>): boolean {
    if (this.event_map.has(eventName)) {
      for (let x of this.event_map.get(eventName)!) {
        x(...args);
      }

      return true;
    }

    return false;
  }
}