export const fractions: Record<number, string> = {
  [0.25]: "¼",
  [0.5]: "½",
  [0.75]: "¾",
  [0.1]: "⅒",
  [0.33]: "⅓",
  [0.66]: "⅔",
  [0.2]: "⅕",
  [0.4]: "⅖",
  [0.6]: "⅗",
  [0.8]: "⅘",
  [0.16]: "⅙",
  [0.83]: "⅚",
  [0.125]: "⅛",
  [0.375]: "⅜",
  [0.625]: "⅝",
  [0.875]: "⅞",
};

const threshhold = 0.01;

export const fraction = (value: number): string => {
  const positive = Math.abs(value);
  const base = Math.floor(positive);
  const decimal = positive - base;

  if (decimal == 0) return `${value < 0 ? "-" : ""}${base}`;

  const max = decimal * (1 + threshhold);
  const min = decimal * (1 - threshhold);
  const match = Object.entries(fractions).find(([key, val]) => {
    const compare = parseFloat(key);
    if (compare <= max && compare >= min) return true;
  });

  if (!match) return `${value}`;

  return `${value < 0 ? "-" : ""}${base === 0 ? "" : base}${match[1]}`;
};
