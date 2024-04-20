import { Config } from ".";

export const base64_encode: Config = {
  title: "Base64 encode",
  method: (value: string) =>
    btoa(
      Array.from(new TextEncoder().encode(value), (byte) =>
        String.fromCodePoint(byte)
      ).join("")
    ),
};

export const base64_decode: Config = {
  title: "Base64 decode",
  method: (value: string) =>
    new TextDecoder().decode(
      Uint8Array.from(atob(value) as any, (m: any) => m.codePointAt(0))
    ),
};
