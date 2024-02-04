import CryptoJs from 'crypto-js';

const key = import.meta.env.VITE_ENCRYPT_SECRET_KEY;
// Encryption and decryption using crypto-js
export const encrypt = (message: string): string => {
  const encryptedMessage = CryptoJs.AES.encrypt(message, key).toString();
  return encryptedMessage;
};

export const decrypt = (encryptedMessage: string): string => {
  try {
    const decryptedBytes = CryptoJs.AES.decrypt(encryptedMessage, key);
    const decryptedMessage = decryptedBytes.toString(CryptoJs.enc.Utf8);
    return decryptedMessage;
  } catch (error) {
    return encryptedMessage;
  }
};

const encryptObjectValue = (value: Record<string, any>) => {
  const encryptedObject: Record<string, string> = {};

  const values = Object.entries(value);
  const encryptedValues = values.map(([objKey, v]) => {
    // Encrypt the value using the encryptValue function
    const encryptedValue = typeof v === 'string' && v ? encrypt(v) : v;
    return [objKey, encryptedValue];
  });

  // Convert the array of encrypted values back into an object
  encryptedValues.forEach(([objKey, encryptedValue]) => {
    encryptedObject[objKey] = encryptedValue;
  });

  return encryptedObject;
};
const decryptObjectValue = (value: Record<string, any>) => {
  const decryptedObject: Record<string, string> = {};

  const values = Object.entries(value);
  const decryptedValues = values.map(([objKey, v]) => {
    // Encrypt the value using the encryptValue function
    const decryptedValue = typeof v === 'string' && v ? decrypt(v) : v;
    return [objKey, decryptedValue];
  });

  // Convert the array of encrypted values back into an object
  decryptedValues.forEach(([objKey, decryptedValue]) => {
    decryptedObject[objKey] = decryptedValue;
  });
  return decryptedObject;
};

export const getEncryptedValue = (
  value: string | number | Record<string, string | number | Record<any, any>>
) => {
  let encryptedValue;

  switch (typeof value) {
    case 'string':
      encryptedValue = encrypt(value);
      break;
    case 'object':
      encryptedValue = encryptObjectValue(value);
      break;
    default:
      encryptedValue = value;
      break;
  }

  return encryptedValue;
};

export const getDecryptedValue = (
  value: string | number | Record<string, string | number | Record<any, any>>
) => {
  let decryptedValue;
  switch (typeof value) {
    case 'string':
      decryptedValue = decrypt(value);
      break;

    case 'object':
      decryptedValue = decryptObjectValue(value);
      break;

    default:
      decryptedValue = value;
      break;
  }
  return decryptedValue;
};

type EncrytptionParams = {
  value: string | number | Record<string, string | number | Record<any, any>>;
  type: string;
};
export const encryption = ({ type, value }: EncrytptionParams) => {
  let encrytedValue;
  switch (type) {
    case 'encrypt':
      encrytedValue = getEncryptedValue(value);
      break;
    case 'decrypt':
      encrytedValue = getDecryptedValue(value);
      break;
    default:
      encrytedValue = value;
      break;
  }
  return encrytedValue;
};
