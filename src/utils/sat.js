import AES256 from 'aes256';

async function myAsyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export const asyncForEach = async (arr, cb) => {
  await myAsyncForEach(arr, cb);
};

export const AESencrypt = function (data, secret) {
  const cipher = AES256.createCipher(secret);
  const encrypted = cipher.encrypt(data);
  return encrypted;
};

export const AESdecrypt = function (hash, data, secret) {
  const cipher = AES256.createCipher(secret);
  const decrypted = cipher.decrypt(hash);
  return data === decrypted;
};

export const parseCompanyName = async function (companyName) {
  if (!companyName) {
    throw new Error('companyName must be non-empty string');
  }
  return companyName.toLowerCase().split(' ').join('-');
};

export const generateReqId = async function (companyName) {
  if (!companyName) {
    throw new Error('companyName must be non-empty string');
  }
  const date = Date.now().toString();
  return `${companyName.toUpperCase().substr(0, 5)}-${date.substr(
    date.length - 5,
    date.length,
  )}`;
};

export const parsePartitionId = async function (docType) {
  if (!docType) {
    throw new Error('docType must be non-empty string');
  }
  return docType.split('-').join('::');
};
