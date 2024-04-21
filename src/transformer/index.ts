import init, {
  base64_decode,
  base64_encode,
  base64_url_decode,
  base64_url_encode,
  to_lower_case,
  to_upper_case,
  jwt_parse,
  json_format,
} from "../../dev-tool-wasm/pkg/dev_tool_wasm";

export type Transformer = (value: string) => string | Promise<string>;

export type Config = {
  title: string;
  method: Transformer;
};

init();

export const configs: Config[] = [
  {
    title: "To upper case",
    method: to_upper_case,
  },
  {
    title: "To lower case",
    method: to_lower_case,
  },
  {
    title: "Base64 encode",
    method: base64_encode,
  },
  {
    title: "Base64 decode",
    method: base64_decode,
  },
  {
    title: "Base64 url encode",
    method: base64_url_encode,
  },
  {
    title: "Base64 url decode",
    method: base64_url_decode,
  },
  { title: "JWT parser", method: jwt_parse },
  {
    title: "JSON formatter",
    method: json_format,
  },
];
