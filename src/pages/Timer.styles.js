import styled, { keyframes, css } from 'styled-components';
import { Link as ReactLink } from 'react-router-dom';

export const BORDER_WIDTH = '0.5em';

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const HourGlassPart = styled.div`
  height: 35vh;
  width: 35vh;
  border-radius: 100%;
  border: ${BORDER_WIDTH} solid #fff;
  overflow: hidden;

  :first-child {
    top: 1vh;
  }

  will-change: auto;
  position: relative;
`;

export const ClockWrapper = styled.div`
  height: 20vh;
  width: 20vh;
  top: 40vh;
  z-index: 5;
  background-color: #131313;

  position: absolute;

  border-radius: 100%;
  border: ${BORDER_WIDTH} solid #fff;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #fff;
  font-weight: bold;
`;

const upperSand = ({ percentage }) => keyframes`
  from {
    transform: scaleY(${percentage});
  }
  to { 
    transform: scaleY(0);
  }
`;

const lowerSand = ({ percentage }) => keyframes`
  from { 
    transform: scaleY(${percentage});
  }
  to { 
    transform: slaceY(1);
}
`;

export const Sand = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isUpper'].includes(prop),
})`
  background-color: #1a1bff;
  position: absolute;
  width: 100%;
  height: 100%;

  ${({ isUpper, duration }) =>
    isUpper
      ? css`
          transform-origin: center bottom;
          animation: ${upperSand} ${duration}s linear;
        `
      : css`
          transform-origin: center bottom;
          animation: ${lowerSand} ${duration}s linear;
        `}
`;

export const Text = styled.h2`
  color: #fff;
  font-size: 3em;
`;

export const Logo = styled.img`
  max-height: 50px;
  margin: 24px;
`;

export const Ribbon = styled.a`
  position: fixed;
  right: 0;
  top: 0;
`;

export const Link = styled(ReactLink).withConfig({
  shouldForwardProp: (prop) => !['isTimer'].includes(prop),
})`
  ${({ isTimer }) =>
    isTimer &&
    `
        position: fixed;
        top: 16px;
        left: 16px;
      `}
  text-decoration: none;

  ${Text} {
    font-size: 1.5em;
    font-weight: semi-bold;
  }
`;
