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
