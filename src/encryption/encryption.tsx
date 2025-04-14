import CryptoJS from "crypto-js";

export default function encryptionofdata(data: any) {
    
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), process.env.NEXT_PUBLIC_ENCRYPTION_SECRET as string ).toString();

    // Make the encrypted string URL-safe by encoding it with Base64 URL-safe format
    // Replace '+' with '-', '/' with '_', and remove '=' padding
    const urlSafeCiphertext = ciphertext
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');

    return urlSafeCiphertext;
}