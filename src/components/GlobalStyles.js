import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html {
    font-size: 10px;
  }

  body {
    font-family: 'Kumbh Sans', sans-serif;
    background-color: ${({ theme }) => theme.body};
    font-size: 1.6rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
  }

  h1 {
    font-size: 2.8rem;
  }

  h2 {
    font-size: 2.4rem;
  }

  h3 {
    font-size: 2rem;
  }

  h4 {
    font-size: 1.4rem;
  }

  * {
    overflow-wrap: break-word;
  }
`;

export default GlobalStyles;
