import React, { useMemo, useEffect, useCallback, useState } from 'react';
import { useSpring } from 'react-spring';
import { useParams } from 'react-router-dom';
import { differenceInMilliseconds } from 'date-fns';

import * as S from './Timer.styles';

const GITHUB_LINK = 'https://github.com/oakslab/Timer';

const Timer = () => {
  const { min = '', time = '' } = useParams();
  const [timer, setTimer] = useState(0);
  const [isTimeup, setIsTimeUp] = useState(false);

  // timer is in miliseconds
  const formatLeftTime = useCallback((timer) => {
    const mins = Math.floor(timer / 60000);
    const seconds = ((timer % 60000) / 1000).toFixed(0);
    return `${mins}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }, []);

  const diffCalculate = useCallback(() => {
    const now = new Date();
    const endTime = new Date();
    const [hour, minute, sec] = time.split(':');
    endTime.setHours(hour);
    endTime.setMinutes(minute);
    endTime.setSeconds(sec);

    const diffInMil = differenceInMilliseconds(endTime, now);
    if (diffInMil <= 0) setIsTimeUp(true);
    return diffInMil;
  }, [time]);

  const [duration, percentage] = useMemo(() => {
    const diffInMil = diffCalculate();

    const diffMinutes = Math.floor(diffInMil / 60000);

    const currPercentage = (diffMinutes / min) * 100;

    return [diffInMil, currPercentage];
  }, [min, diffCalculate]);

  useEffect(() => {
    setTimer(duration);
  }, [duration]);

  useEffect(() => {
    setInterval(() => {
      const diff = diffCalculate();
      setTimer(diff);
    }, 100);
  }, [setTimer, diffCalculate]);

  const upperSand = useSpring({
    from: { top: `${100 - percentage}%` },
    to: { top: '100%' },
    config: {
      duration,
    },
  });

  const lowerSand = useSpring({
    from: { top: `${percentage}%` },
    to: { top: `0%` },
    config: {
      duration,
    },
  });

  if (isTimeup) {
    return (
      <S.Wrapper>
        <S.Ribbon href={GITHUB_LINK} target="_blank" rel="noopener noreferrer">
          <img
            loading="lazy"
            width="149"
            height="149"
            src="https://github.blog/wp-content/uploads/2008/12/forkme_right_white_ffffff.png?resize=149%2C149"
            alt="Fork me on GitHub"
          />
        </S.Ribbon>
        <S.Text>Time is up</S.Text>
        <S.Logo src="/img/ooo.png" />
        <S.Text>Thank you for using it.</S.Text>
        <a href="https://github.com/Ketcap" target="_blank" rel="noopener noreferrer">
          <S.Logo small src="/img/github.png" />
        </a>
        <S.Link to="/">
          <S.Text>Home</S.Text>
        </S.Link>
      </S.Wrapper>
    );
  }

  return (
    <S.Wrapper>
      <S.Link to="/" isTimer>
        <S.Text> {`<`} </S.Text>
      </S.Link>
      <S.ClockWrapper>{formatLeftTime(timer)}</S.ClockWrapper>
      <S.HourGlassPart>
        <S.Sand style={upperSand} />
      </S.HourGlassPart>
      <S.HourGlassPart>
        <S.Sand style={lowerSand} />
      </S.HourGlassPart>
    </S.Wrapper>
  );
};

export default Timer;
