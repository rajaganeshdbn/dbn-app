export const required = { required: 'Required' };
export const asEmail = {
  ...required,
  pattern: {
    value: /^\S+@\S+$/i,
    message: 'Entered value does not match email format',
  },
};
export const asPassword = {
  ...required,
  minLength: {
    value: 8,
    message: 'Min length is 8',
  },
};

export const asName = {
  ...required,
  minLength: {
    value: 3,
    message: 'Min length is 3',
  },
};
