type Algorithm = "SHA-256";

export const toHash = async (data: Uint8Array, algorithm: Algorithm) => {
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
};

export const hashCheck = async (
  data: Uint8Array,
  algorithm: Algorithm,
  correctHash: string
) => {
  const fileHash = await toHash(data, algorithm);
  if (fileHash !== correctHash) {
    throw new Error(`Hash does not match.
  expected: ${correctHash}
  actual:   ${fileHash}`);
  }

  return true;
};
