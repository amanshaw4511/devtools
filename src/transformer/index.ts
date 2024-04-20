import {
  base64_decode,
  base64_encode,
  base64_url_decode,
  base64_url_encode,
} from "./base64";
import { jwt_parse } from "./jwt";

import init, {
  to_lower_case,
  to_upper_case,
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
  base64_encode,
  base64_decode,
  jwt_parse,
  base64_url_encode,
  base64_url_decode,
];
