import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

export type CypherHash = { iv: string; content: string };

export class CryptoHelper {
  private static readonly algorithm = 'aes-256-ctr';
  private static readonly secretKey = '55U4ymCvPO46lE35Jb3CwJs8ypSZh73g';

  static encrypt(text: string) {
    const iv = randomBytes(16);
    const cipher = createCipheriv(
      CryptoHelper.algorithm,
      CryptoHelper.secretKey,
      iv,
    );

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
      iv: iv.toString('hex'),
      content: encrypted.toString('hex'),
    };
  }

  static decrypt(hash: CypherHash) {
    const decipher = createDecipheriv(
      CryptoHelper.algorithm,
      CryptoHelper.secretKey,
      Buffer.from(hash.iv, 'hex'),
    );

    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(hash.content, 'hex')),
      decipher.final(),
    ]);

    return decrypted.toString();
  }
}
