import styled from 'styled-components';

export const Wrapper = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TimerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 24px;
`;

export const TimerButton = styled.div`
  display: inline-flex;
  background-color: transparent;
  border: 3px solid #1A1BFF;
  border-radius 5px;
  padding: 16px;
  margin: 8px;
  color: white;
  text-decoration: none;
`;

export const Logo = styled.img`
  max-height: 50px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Input = styled.input`
  background-color: transparent;
  border: 3px solid #1a1bff;
  height: 38px;
  margin-right: 16px;
  text-align: center;
  color: #fff;

  ::placeholder {
    color: #1a1bff;
    text-align: center;
  }
`;

export const Button = styled.button`
  padding: 16px;
  background: #00f;
  color: #fff;
  text-align: center;
  border: 0;
  outline: none;
  cursor: pointer;
  border-radius: 4px;
`;
