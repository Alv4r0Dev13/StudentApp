import 'react-toastify/dist/ReactToastify.css';
import styled, { createGlobalStyle } from 'styled-components';
import * as colors from '../config/colors';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box
  }

  html, body, #root {
    height: 100%
  }

  body {
    font-family: sans-serif;
    background-color: ${colors.primaryDark}
  }

  button {
    cursor: pointer;
    color: #fff;
    font-weight: 700;
    background-color: ${colors.primary};
    border:none;
    border-radius: 4px;
    padding: 10px 20px;
    transition: all 300ms;

    &:hover {
      filter: brightness(75%)
    }
  }

  a {
    text-decoration: none;
    color: ${colors.primary}
  }

  ul {
    list-style: none;
  }

  body .Toastify .Toastify__toast-container .Toastify__toast--success {
    background-color: ${colors.success}
  }
  body .Toastify .Toastify__toast-container .Toastify__toast--error {
    background-color: ${colors.error}
  }
`;

export const Container = styled.section`
  max-width: 480px;
  background-color: white;
  margin: 30px auto;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
