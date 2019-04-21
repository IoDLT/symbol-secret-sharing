[![Build Status](https://travis-ci.org/CrackTheCode016/nem2-secret-share.svg?branch=master)](https://travis-ci.org/CrackTheCode016/nem2-secret-share)
[![npm version](https://badge.fury.io/js/nem2-secret-sharing.svg)](https://badge.fury.io/js/nem2-secret-sharing)
<img src="https://img.shields.io/hexpm/l/plug.svg"> 


# NEM2 Secret Sharing Library Concept

Warning:  This is an experimental library, it is NOT to be used for production applications.

### About

This library utilizes Shamir's Secret Sharing, a mechanism in which a given secret is divided in to a series of parts that can be later be combined to reveal the secret (called the threshold scheme).  It uses this mechanism to 'shard' NEM2 private keys into multiple shares, of which `n` of `m` shares are required to fully reveal the secret.  You can read more about Shamir's Secret Sharing [![here](https://en.wikipedia.org/wiki/Shamir's_Secret_Sharing)].

This has a host of use cases in NEM2, such as the ability to distribute a private key to multiple individuals reflecting their permissions to access information on the blockchain.   

### Basic Usage

The basic usage is outlined below.  You can create sharded private keys, encrypt, and decrypt messages.  Please note that this may change in the near future, and some edge cases may not (yet) be covered.

 - Install: `npm install nem2-secret-sharing`

 ```
    /* Divide a private key into multiple shares */

    import { SecretShareMessage } from 'nem2-secret-sharing';
    import { Account, EncryptedMessage } from 'nem2-sdk'; 

    const testAccount = Account.createFromPrivateKey
  ('DD7855326A15DD11E33E30C909CD5E66036BF7BB868D143BC8F9735C9A8CFE2C', NetworkType.MIJIN_TEST);

    /* The message that you want to encrypt */

    const secretMessage: string = 'MY secret, and my secret only';

    /* The 'threshold, or n of m shares needed to unlock the secret' */

    const threshold = 3;

    /* Total number of shares to be issued */

    const numOfShares = 5;


    /* Sharded private key, can be used for encryption */

   const privateKeySharded: [any] =
   SecretShareMessage.createShardedPrivateKey(numOfShares, threshold, testAccount.privateKey);

   /* Use a sharded key to encrypt the message.  It has to have enough info has defined in the threshold */

   const encryptedMessage: EncryptedMessage =
      SecretShareMessage.create(secretMessage, privateKeySharded, threshold);

   /* Use the sharded key to decrypt the message */
    
     const decryptedMessage = SecretShareMessage.decrypt(encryptedMessage.payload,
      privateKeySharded, threshold); 
    

 ```
