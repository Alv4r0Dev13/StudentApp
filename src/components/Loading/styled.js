import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: #fff;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;

  div {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.8);
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  span {
    z-index: 2;
  }
`;
