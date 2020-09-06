import styled from 'styled-components';
import { Link as ReactLink } from 'react-router-dom';

export const Wrapper = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1;
  justify-content: space-between;
  padding: 16px;
`;

export const Text = styled.h2`
  color: #fff;
  font-size: 3em;
  text-align: center;
`;

export const Link = styled(ReactLink)`
  top: 16px;
  left: 16px;
  text-decoration: none;
  ${Text} {
    font-size: 1.5em;
    font-weight: semi-bold;
  }
`;
