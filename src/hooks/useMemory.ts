import React from "react";

export const useMemory = <T extends Record<string, unknown>>(
  key: string,
  default_value: T
): [T, (data: T) => void] => {
  const fromStorage = localStorage.getItem(key);
  const initial = fromStorage ? JSON.parse(fromStorage) : null;
  const [state, setState] = React.useState<T>(initial || default_value);

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, (d) => setState(d)];
};
