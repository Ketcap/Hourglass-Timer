import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { add } from 'date-fns';
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
  const { replace } = useHistory();

  useEffect(() => {
    if (min) {
      const date = new Date();
      const future = add(date, { minutes: min });
      const mins = future.getMinutes();
      const hours = future.getHours();
      const seconds = future.getSeconds();
      replace(`/${min}/${hours}:${mins}:${seconds}`);
    }
  }, [min, replace]);

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
    </S.Wrapper>
  );
};

export default Home;
