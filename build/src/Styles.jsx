import { ThemeProvider, createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Roboto', sans-serif;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
  }
`;

export const theme = {
    colors: {
        primary: '#4CAF50',
        secondary: '#2196F3',
        background: '#F5F5F5',
        text: '#333333',
        lightGrey: '#E0E0E0',
    },
    breakpoints: {
        mobile: '480px',
        tablet: '768px',
        desktop: '1024px',
    }
};

export function StyleProvider({ children }) {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            {children}
        </ThemeProvider>
    );
}