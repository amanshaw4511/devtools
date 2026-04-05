use std::collections::HashMap;

use crate::base64::base64_url_decode;
use serde_json::Value;
use wasm_bindgen::prelude::{wasm_bindgen, JsValue};

#[wasm_bindgen]
pub fn jwt_parse(input: &str) -> Result<String, JsValue> {
    let mut input_iter = input.split('.').into_iter();

    let header_b64 = input_iter
        .next()
        .ok_or_else(|| JsValue::from_str("Invalid JWT: missing header segment"))?;
    let payload_b64 = input_iter
        .next()
        .ok_or_else(|| JsValue::from_str("Invalid JWT: missing payload segment"))?;

    let header = base64_url_decode(header_b64)?;
    let payload = base64_url_decode(payload_b64)?;

    let header: Value = serde_json::from_str(&header)
        .map_err(|e| JsValue::from_str(&format!("Invalid JWT header JSON: {e}")))?;
    let payload: Value = serde_json::from_str(&payload)
        .map_err(|e| JsValue::from_str(&format!("Invalid JWT payload JSON: {e}")))?;

    let mut out = HashMap::new();
    out.insert("header", header);
    out.insert("payload", payload);

    serde_json::to_string_pretty(&out)
        .map_err(|e| JsValue::from_str(&format!("Failed to format JWT JSON: {e}")))
}

#[cfg(test)]
mod tests {
    use crate::jwt::jwt_parse;

    #[test]
    fn jwt_parse_test() {
        let jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
        let expected = "{\n  \"payload\": {\n    \"iat\": 1516239022,\n    \"name\": \"John Doe\",\n    \"sub\": \"1234567890\"\n  },\n  \"header\": {\n    \"alg\": \"HS256\",\n    \"typ\": \"JWT\"\n  }\n}";
        assert_eq!(jwt_parse(jwt).unwrap(), expected);
    }
}
