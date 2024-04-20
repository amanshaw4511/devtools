use std::collections::HashMap;

use crate::base64::base64_url_decode;
use serde_json::Value;
use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
pub fn jwt_parse(input: &str) -> String {
    let mut input_iter = input.split(".").into_iter();
    let header = input_iter.next().unwrap();
    let paylod = input_iter.next().unwrap();

    let header = base64_url_decode(header);
    let payload = base64_url_decode(paylod);

    let header: Value = serde_json::from_str(&header).unwrap();
    let payload: Value = serde_json::from_str(&payload).unwrap();

    let mut out = HashMap::new();
    out.insert("header", header);
    out.insert("payload", payload);

    serde_json::to_string_pretty(&out).unwrap()
}

#[cfg(test)]
mod tests {
    use crate::jwt::jwt_parse;

    #[test]
    fn jwt_parse_test() {
        let jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
        let expected = "{\n  \"payload\": {\n    \"iat\": 1516239022,\n    \"name\": \"John Doe\",\n    \"sub\": \"1234567890\"\n  },\n  \"header\": {\n    \"alg\": \"HS256\",\n    \"typ\": \"JWT\"\n  }\n}";
        assert_eq!(jwt_parse(jwt), expected);
    }
}
