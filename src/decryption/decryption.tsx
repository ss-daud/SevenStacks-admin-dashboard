import CryptoJS from "crypto-js";

interface DecryptionError extends Error {
    ciphertext: string;
}

const secret = process.env.NEXT_PUBLIC_ENCRYPTION_SECRET;

export default function decryptionofData<DecryptionError>(ciphertext: any) {
  if (!ciphertext) {
    throw new Error("Encrypted data is empty or undefined!");
  }
  try {
    let standardBase64 = ciphertext
    .replace(/-/g, '+')
    .replace(/_/g, '/');
    
  // Add padding if necessary
  while (standardBase64.length % 4) {
    standardBase64 += '=';
  }
  
  // Decrypt the data
  const bytes = CryptoJS.AES.decrypt(standardBase64, secret as string);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
  } catch (error:any) {
    console.error("Decryption Error:", error.message);
    throw new Error("Failed to decrypt data");
  }
}