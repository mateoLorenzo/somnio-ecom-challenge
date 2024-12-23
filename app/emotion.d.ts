import { SerializedStyles } from "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      primary: string;
      secondary: string;
    };
  }
}

declare module "react" {
  interface DOMAttributes {
    css?: SerializedStyles;
  }
}
