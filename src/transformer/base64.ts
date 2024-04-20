import { Config } from ".";

const base64Url_to_base64 = (base64: string) => {
  base64 = base64.replace(/-/g, "+").replace(/_/g, "/");

  // Pad out with standard base64 required padding characters
  var pad = base64.length % 4;
  if (pad) {
    if (pad === 1) {
      throw new Error(
        "InvalidLengthError: Input base64url string is the wrong length to determine padding"
      );
    }
    base64 += new Array(5 - pad).join("=");
  }

  return base64;
};

const base64_to_base64Url = (base64Url: string) => {
  return base64Url.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
};

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

export const base64_url_encode: Config = {
  title: "Base64 url encode",
  method: (value) => base64_to_base64Url(base64_encode.method(value)),
};

export const base64_url_decode: Config = {
  title: "Base64 url decode",
  method: (value) => base64_decode.method(base64Url_to_base64(value)),
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

  describe("base64 url", () => {
    it("encode", () => {
      expect(base64_url_encode.method("xs?>>>")).toBe("eHM_Pj4-");
    });

    it("decode", () => {
      expect(base64_url_decode.method("eHM_Pj4-")).toBe("xs?>>>");
    });
  });
}
