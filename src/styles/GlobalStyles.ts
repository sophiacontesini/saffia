import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: linear-gradient(135deg, #f0f7f4 0%, #e8f5ef 100%);
    min-height: 100vh;
    color: #2d3748;
    line-height: 1.6;
    position: relative;
    overflow-x: hidden;
    width: 100%;
  }

  body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    background-image: url('/escudoVerde-spaced.png?v=2');
    background-repeat: repeat;
    background-size: 50px 50px;
    background-position: 0 0;
    opacity: 0.1;
    z-index: 0;
    pointer-events: none;
  }

  #root {
    position: relative;
    z-index: 1;
    width: 100%;
    overflow-x: hidden;
  }

  html {
    overflow-x: hidden;
    width: 100%;
  }
`

