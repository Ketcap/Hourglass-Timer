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
  margin: 24px;
`;
