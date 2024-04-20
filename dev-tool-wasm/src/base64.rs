use base64::engine::general_purpose::STANDARD;
use base64::engine::general_purpose::URL_SAFE;
use base64::engine::general_purpose::URL_SAFE_NO_PAD;
use base64::Engine;
use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
pub fn base64_encode(input: &str) -> String {
    STANDARD.encode(input)
}

#[wasm_bindgen]
pub fn base64_decode(input: &str) -> String {
    String::from_utf8(STANDARD.decode(input).unwrap()).unwrap()
}

#[wasm_bindgen]
pub fn base64_url_encode(input: &str) -> String {
    URL_SAFE.encode(input)
}

#[wasm_bindgen]
pub fn base64_url_decode(input: &str) -> String {
    let value = URL_SAFE
        .decode(input)
        .or(URL_SAFE_NO_PAD.decode(input))
        .unwrap();
    String::from_utf8(value).unwrap()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn base64_encode_test() {
        assert_eq!(base64_encode("xs?>>>"), "eHM/Pj4+")
    }

    #[test]
    fn base64_decode_test() {
        assert_eq!(base64_decode("eHM/Pj4+"), "xs?>>>")
    }

    #[test]
    fn base64_url_encode_test() {
        assert_eq!(base64_url_encode("xs?>>>"), "eHM_Pj4-")
    }

    #[test]
    fn base64_url_decode_test() {
        assert_eq!(base64_url_decode("eHM_Pj4-"), "xs?>>>")
    }

    #[test]
    fn base64_url_decode_without_paddng() {
        assert_eq!(
            base64_url_decode(
                "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ"
            ),
            "{\"sub\":\"1234567890\",\"name\":\"John Doe\",\"iat\":1516239022}"
        )
    }
}
