import {
  SecretShareMessage,
} from '../../src/SecretShareMessage';
import {
  PlainMessage,
  EncryptedMessage,
  Account,
  NetworkType,
} from '../../node_modules/symbol-sdk';

describe('Secret Share Message', () => {

  const message = 'symbol ftw!';
  const threshold = 3;
  const numOfRecipients = 5;
  const networkType = NetworkType.TEST_NET;
  const testAccount = Account.createFromPrivateKey
    ('026E2BCFC273FB59DA36EC1A06EC3B096597F7EDCADA39D88E75DF8D18614228', networkType);

  it('should shard a private key', () => {
    const privateKeySharded: [any] =
      SecretShareMessage.createShardedPrivateKey(numOfRecipients, threshold, networkType, testAccount.privateKey);
    expect(privateKeySharded.length).toEqual(numOfRecipients);
  });

  it('should encrypt a message using a sharded key', () => {
    const privateKeySharded: [any] =
      SecretShareMessage.createShardedPrivateKey(numOfRecipients, threshold, networkType, testAccount.privateKey);

    const encryptedMessage: EncryptedMessage =
      SecretShareMessage.create(message, privateKeySharded, threshold);
    const plainMessage: PlainMessage = testAccount.decryptMessage(encryptedMessage, testAccount.publicAccount);
    expect(plainMessage.payload).toEqual(message);
  });

  it('should decrypt a message using a sharded key', () => {
    const privateKeySharded: [any] =
      SecretShareMessage.createShardedPrivateKey(numOfRecipients, threshold, networkType, testAccount.privateKey);

    const encryptedMessage: EncryptedMessage =
      SecretShareMessage.create(message, privateKeySharded, threshold);

    const decryptedMessage = SecretShareMessage.decrypt(encryptedMessage,
      privateKeySharded, threshold, networkType);

    expect(decryptedMessage.payload).toEqual(message);
  });

});
