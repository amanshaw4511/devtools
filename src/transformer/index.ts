import {
  base64_decode,
  base64_encode,
  base64_url_decode,
  base64_url_encode,
} from "./base64";
import { jwt_parse } from "./jwt";

export type Transformer = (value: string) => string;

export type Config = {
  title: string;
  method: Transformer;
};

export const configs: Config[] = [
  {
    title: "To upper case",
    method: (value: string) => value.toLocaleUpperCase(),
  },
  {
    title: "To lower case",
    method: (value: string) => value.toLocaleLowerCase(),
  },
  base64_encode,
  base64_decode,
  jwt_parse,
  base64_url_encode,
  base64_url_decode,
];
