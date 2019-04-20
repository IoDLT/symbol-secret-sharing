import {
  SecretShareMessage,
} from '../../src/SecretShareMessage';
import {
  PlainMessage,
  EncryptedMessage,
  Account,
  NetworkType,
} from '../../node_modules/nem2-sdk';

describe('Secret Share Message', () => {

  const message = 'nem2ftw';
  const threshold = 3;
  const numOfRecipients = 5;
  const testAccount = Account.createFromPrivateKey
  ('DD7855326A15DD11E33E30C909CD5E66036BF7BB868D143BC8F9735C9A8CFE2C', NetworkType.MIJIN_TEST);

  it('should shard a private key', () => {
    const privateKeySharded: [any] =
      SecretShareMessage.createShardedPrivateKey(numOfRecipients, threshold, testAccount.privateKey);
    expect(privateKeySharded.length).toEqual(numOfRecipients);
  });

  it('should encrypt a message using a sharded key', () => {
    const privateKeySharded: [any] =
      SecretShareMessage.createShardedPrivateKey(numOfRecipients, threshold, testAccount.privateKey);

    const encryptedMessage: EncryptedMessage =
      SecretShareMessage.create(message, privateKeySharded, threshold);
    const plainMessage: PlainMessage = testAccount.decryptMessage(encryptedMessage, testAccount.publicAccount);
    expect(plainMessage.payload).toEqual(message);
  });

  it('should decrypt a message using a sharded key', () => {
    const privateKeySharded: [any] =
      SecretShareMessage.createShardedPrivateKey(numOfRecipients, threshold, testAccount.privateKey);

    const encryptedMessage: EncryptedMessage =
      SecretShareMessage.create(message, privateKeySharded, threshold);

    const decryptedMessage = SecretShareMessage.decrypt(encryptedMessage.payload,
      privateKeySharded, threshold);

    expect(decryptedMessage.payload).toEqual(message);
  });

});
