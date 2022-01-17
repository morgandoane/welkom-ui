export const startsWithNumber = (value: string): boolean => {
    if (value.length == 0) return false;
    const char = value[0];
    if (
        [9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((n) => n.toString()).includes(char)
    ) {
        return true;
    } else {
        return false;
    }
};
