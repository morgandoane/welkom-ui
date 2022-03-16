export const pad = (num: number, size: number): string => {
    const s = '000000000' + num;
    return s.substring(s.length - size);
};
