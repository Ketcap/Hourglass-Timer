import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { add, isSameDay } from 'date-fns';
import { Link } from 'react-router-dom';

import * as S from './Home.styles';

const MINUTES = [
  { value: 1 },
  { value: 5 },
  { value: 10 },
  { value: 15 },
  { value: 20 },
  { value: 25 },
  { value: 30 },
  { value: 60 },
];

const Home = () => {
  const { min } = useParams();
  const { replace, push } = useHistory();
  const [customMin, setCustomMin] = useState('');

  useEffect(() => {
    if (min) {
      const date = new Date();
      const future = add(date, { minutes: min });
      const mins = future.getMinutes();
      const hours = future.getHours();
      const seconds = future.getSeconds();
      if (isSameDay(date, future)) {
        replace(`/${min}/${hours}:${mins}:${seconds}`);
      }
      const day = future.getDate();
      const month = future.getMonth();
      const year = future.getFullYear();
      replace(`/${min}/${day}:${month}:${year}:${hours}:${mins}:${seconds}`);
    }
  }, [min, replace]);

  const onInputChange = useCallback((event) => {
    const { value } = event.currentTarget;
    const min = parseInt(value, 10);
    if (!isNaN(min) || value === '') {
      setCustomMin(value === '' ? value : min);
    }
  }, []);

  const customTimer = useCallback(() => {
    const minutes = parseInt(customMin, 10);
    if (isNaN(minutes)) return;
    push(`/${minutes}`);
  }, [customMin, push]);

  return (
    <S.Wrapper>
      <S.Logo src="/img/ooo.png" />
      <S.TimerWrapper>
        {MINUTES.map((item, index) => (
          <S.TimerButton key={index} as={Link} to={`/${item.value}`}>
            {item.value} min
          </S.TimerButton>
        ))}
      </S.TimerWrapper>
      <S.InputWrapper>
        <S.Input placeholder="Custom Minute" value={customMin} onChange={onInputChange} />
        <S.Button onClick={customTimer}>Time It</S.Button>
      </S.InputWrapper>
    </S.Wrapper>
  );
};

export default Home;
