use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
pub fn to_upper_case(input: &str) -> String {
    input.to_uppercase()
}

#[wasm_bindgen]
pub fn to_lower_case(input: &str) -> String {
    input.to_lowercase()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn to_upper_case_test() {
        assert_eq!("HELLO", to_upper_case("hello"))
    }

    #[test]
    fn to_lower_case_test() {
        assert_eq!("hello", to_lower_case("HELLO"))
    }
}
