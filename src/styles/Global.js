import styled, { createGlobalStyle } from 'styled-components';
import { primary, primaryDark } from '../config/colors';

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
    background-color: ${primaryDark}
  }

  button {
    cursor: pointer;
    color: #fff;
    font-weight: 700;
    background-color: ${primary};
    border:none;
    border-radius: 4px;
    padding: 10px 20px;
  }

  a {
    text-decoration: none;
    color: ${primary}
  }

  ul {
    list-style: none;
  }
`;

export const Container = styled.section`
  max-width: 360px;
  background-color: white;
  margin: 30px auto;
  padding: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
