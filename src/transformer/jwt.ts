import { Config } from ".";
import { base64_url_decode } from "./base64";

export const jwt_parse: Config = {
  title: "JWT parse",
  method: (value: string) => {
    const [header, payload, _signature] = value.split(".");
    const header_decoded = base64_url_decode.method(header);
    const payload_decoded = base64_url_decode.method(payload);

    return JSON.stringify(
      {
        header: JSON.parse(header_decoded),
        payload: JSON.parse(payload_decoded),
      },
      null,
      2
    );
  },
};

if (process.env.NODE_ENV === "test") {
  describe("JWT parse", () => {
    it("parse", () => {
      const jwt =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
      expect(jwt_parse.method(jwt)).toBe(
        JSON.stringify(
          {
            header: {
              alg: "HS256",
              typ: "JWT",
            },
            payload: {
              sub: "1234567890",
              name: "John Doe",
              iat: 1516239022,
            },
          },
          null,
          2
        )
      );
    });
  });
}
