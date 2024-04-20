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
if (process.env.NODE_ENV === "test") {
  describe("base64", () => {
    it("encode", () => {
      expect(base64_encode.method("hello")).toBe("aGVsbG8=");
    });

    it("decode", () => {
      expect(base64_decode.method("aGVsbG8=")).toBe("hello");
    });
  });
}
