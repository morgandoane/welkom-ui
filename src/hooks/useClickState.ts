import React from "react";

export const useClickState = <
  Element = HTMLButtonElement,
  T extends { target: EventTarget & Element } = {
    target: EventTarget & Element;
  }
>(): [T | null, (data: T | null) => void] => {
  const [state, setState] = React.useState<T | null>(null);

  return [state, (data) => setState(data)];
};
