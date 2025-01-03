# DevTools

A collection of essential developer tools and utilities to streamline development workflows and boost productivity.

## 🌐 **Live Demo**
Check out the live application here: [DevTools Website](https://devtools.amansaw.com/)

## 🚀 **Tools Available**
- Base64 encoder
- Base64 decoder
- Base64 url encoder
- Base64 url decoder
- JWT parser
- XML formatter
- JSON formatter

## 📦 **Local Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/amanshaw4511/devtools.git
   cd devtools
   ```
2. Install Node dependencies:
   ```bash
   pnpm install
   ```
3. Run the React application:
   ```bash
   pnpm run dev
   ```

The backend tools are written in **Rust** and compiled into **WebAssembly**, enabling seamless integration into the React application without requiring a backend server.

## 🛠️ **Setup Rust Project**
1. Ensure Rust is installed. Follow the [Rust installation guide](https://www.rust-lang.org/tools/install).
2. Navigate to the Rust project directory:
   ```bash
   cd dev-tools-wasm
   ```
3. Install `wasm-pack`:
   ```bash
   cargo install wasm-pack
   ```
4. Compile the Rust code into WebAssembly:
   ```bash
   wasm-pack build --target web
   ```
5. The compiled WebAssembly module will now be accessible from the React application.

---

## ⚙️ **Adding a New Tool**

To add a new tool, follow the steps below. We'll demonstrate this by adding a **Character Counter** tool.

### 1. **Create a new Rust module:**

- Create a new file in the `dev-tools-wasm/src` directory named `character-counter.rs`.
- Add the following code:
  ```rust
  #[wasm_bindgen]
  pub fn character_counter(input: &str) -> String {
      input.len().to_string()
  }

  // Unit tests
  #[cfg(test)]
  mod tests {
      use super::*;

      #[test]
      fn test_character_counter() {
          assert_eq!(character_counter("hello world!"), "12");
      }
  }
  ```

### 2. **Update `lib.rs`:**

- Open `dev-tools-wasm/src/lib.rs` and add the new module.
  ```rust
  mod character_counter;
  ```

### 3. **Rebuild the WebAssembly module:**
   Rebuild the project to compile the new tool into WebAssembly:
   ```bash
   wasm-pack build --target web
   ```

### 4. **Update the React UI:**

- Open `src/transformer/index.ts`.
- Update the `configs` array to add your new tool:
  ```ts
  export const configs: Config[] = [
      // ... other tools
      {
          title: "Character Counter",
          method: "character_counter", // This should match the Rust function name
      }
  ]
  ```

### 5. **Verify the changes:**

- Run the application to see the new tool in action:
  ```bash
  pnpm run dev
  ```

---

