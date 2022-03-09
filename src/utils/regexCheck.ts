export const regexTest = (string: string, regex: RegExp): boolean =>
    regex.test(string);

export type PasswordPolicy =
    | 'At least 8 characters'
    | 'One uppercase'
    | 'One lowercase'
    | 'One number'
    | 'One special character'
    | 'Matches confirmation';

export const RegexFormats: Record<PasswordPolicy, RegExp> = {
    ['At least 8 characters']: /^.{8,}/g,
    ['One uppercase']: /^(?=.*[A-Z])/g,
    ['One lowercase']: /^(?=.*[a-z])/g,
    ['One number']: /^(?=.*\d)/g,
    ['One special character']: /^(?=.*[#$@!%&*?])/g,
    ['Matches confirmation']: /^/g,
};

const checkPolicy = (value: string, policy: PasswordPolicy): boolean =>
    RegexFormats[policy].test(value);

export const checkPassword = (
    value: string,
    confirmation: string
): [acceptable: boolean, schema: Record<PasswordPolicy, boolean>] => {
    const schema = {
        ['At least 8 characters']: value.length >= 8,
        ['One uppercase']: checkPolicy(value, 'One uppercase'),
        ['One lowercase']: checkPolicy(value, 'One lowercase'),
        ['One number']: checkPolicy(value, 'One number'),
        ['One special character']: checkPolicy(value, 'One special character'),
        ['Matches confirmation']: value === confirmation && value.length > 0,
    };

    return [Object.values(schema).every((d) => d), schema];
};
