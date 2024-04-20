import { Config } from ".";
import { base64_decode } from "./base64";
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

export const jwt_parse: Config = {
  title: "JWT parse",
  method: (value: string) => {
    const [header, payload, _signature] = value.split(".");
    const header_decoded = base64_decode.method(base64Url_to_base64(header));
    const payload_decoded = base64_decode.method(base64Url_to_base64(payload));

    return JSON.stringify({
      header: JSON.parse(header_decoded),
      payload: JSON.parse(payload_decoded),
    });
  },
};

if (process.env.NODE_ENV === "test") {
  describe("JWT parse", () => {
    it("parse", () => {
      const jwt =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
      expect(jwt_parse.method(jwt)).toBe(
        JSON.stringify({
          header: {
            alg: "HS256",
            typ: "JWT",
          },
          payload: {
            sub: "1234567890",
            name: "John Doe",
            iat: 1516239022,
          },
        })
      );
    });
  });
}
