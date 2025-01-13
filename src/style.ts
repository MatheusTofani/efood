

import { createGlobalStyle, styled  } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'roboto', sans-serif;
   
    @media (max-width: 1024px) {
        overflow-x: hidden;
    }
}


`