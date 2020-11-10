import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Kumbh Sans', sans-serif;
    background-color: ${({ theme }) => theme.body};
    font-size: 1.6rem;
    
  }
`;

export default GlobalStyles;
