import React from 'react';

import * as S from './navbar.styles';

const options = [1, 2, 3];

const Navbar = ({ setNotification, notification }) => (
  <S.Wrapper>
    <S.Link to="/">
      <S.Text> {`<`} </S.Text>
    </S.Link>
    <select onChange={setNotification} value={notification}>
      <option value="none" disabled>
        Select Notification Sound
      </option>
      {options.map((option) => (
        <option value={option} key={option}>
          Notification {option}
        </option>
      ))}
    </select>
  </S.Wrapper>
);

export default Navbar;
