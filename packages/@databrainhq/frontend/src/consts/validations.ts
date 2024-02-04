export const required = {
  required: {
    value: true,
    message: 'This field is required',
  },
};
export const asEmail = {
  ...required,
  pattern: {
    value: /^\S+@\S+$/i,
    message: 'Entered value does not match email format',
  },
};

const containsSpecialCharacter = (value: string) => {
  const specialCharacterRegex = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/;
  return specialCharacterRegex.test(value)
    ? true
    : 'Password must contain at least one special character';
};

export const asPassword = {
  ...required,
  minLength: {
    value: 8,
    message: 'Min length is 8',
  },
  validate: containsSpecialCharacter,
};

export const asName = {
  ...required,
  minLength: {
    value: 3,
    message: 'Min length is 3',
  },
};

export const blockedDomains = [
  'gmail.com',
  'yahoo.com',
  'outlook.com',
  'aol.com',
  'icloud.com',
  'hotmail.com',
  'live.com',
  'mail.com',
  'yandex.com',
  'protonmail.com',
  'zoho.com',
  'inbox.com',
  'fastmail.com',
  'tutanota.com',
  'gmx.com',
  'mailinator.com',
  'rocketmail.com',
  'hushmail.com',
  'earthlink.net',
  'lavabit.com',
  'rediffmail.com',
  'cox.net',
  'att.net',
  'verizon.net',
  'comcast.net',
  'me.com',
  'bellsouth.net',
  'msn.com',
  'sbcglobal.net',
  'optonline.net',
  'roadrunner.com',
  'charter.net',
  'windstream.net',
  'juno.com',
];

export const asWorkEmail = {
  required: 'Email is required',
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    message: 'Invalid email address',
  },
  validate: (value: string | undefined) => {
    const domain = value?.split('@')?.[1];
    if (blockedDomains.includes(domain || '')) {
      return 'Please use work email address.';
    }
    return true;
  },
};
