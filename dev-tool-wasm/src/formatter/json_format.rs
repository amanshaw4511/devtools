use serde_json::Value;
use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
pub fn json_format(input: &str) -> String {
    let parsed_input = serde_json::from_str::<Value>(input).unwrap();
    serde_json::to_string_pretty(&parsed_input).unwrap()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn json_format_test() {
        let input = "{\"a\":3,\"b\":\"hello\"}";
        let output = "{\n  \"a\": 3,\n  \"b\": \"hello\"\n}";
        assert_eq!(json_format(input), output);
    }
}
