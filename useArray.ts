import { Dispatch, SetStateAction, useState } from 'react';

interface UseArrayReturn<T> {
  array: T[];
  set: Dispatch<SetStateAction<T[]>>;
  push: (element: T) => void;
  filter: (callback: (value: T, index: number, array: T[]) => boolean) => void;
  update: (index: number, newElement: T) => void;
  remove: (index: number) => void;
  clear: () => void;
}

export default function useArray<T>(defaultValue: T[]): UseArrayReturn<T> {
  const [array, setArray] = useState(defaultValue);

  const set: Dispatch<SetStateAction<T[]>> = (newArray) => {
    setArray(newArray);
  }

  const push = (item: T): void => {
    setArray(prev => [...prev, item]);
  }

  const remove = (index: number): void => {
    setArray(prev => prev.filter((_, i) => i != index));
  }

  const filter = (predicate: (value: T, index: number, array: T[]) => boolean): void => {
    setArray(prev => prev.filter((...args) => predicate(...args)));
  }

  const update = (index: number, newItem: T): void => {
    setArray(prev => prev.map((item, i) => (i === index ? newItem : item)));
  }

  const clear = () => {
    setArray([]);
  }

  return {array, set, push, filter, update, remove, clear};
  ;
}