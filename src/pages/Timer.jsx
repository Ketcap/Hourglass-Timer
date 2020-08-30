import React, { useMemo, useEffect, useCallback, useState } from 'react';
import { useSpring } from 'react-spring';
import { useParams } from 'react-router-dom';
import { differenceInSeconds } from 'date-fns';

import * as S from './Timer.styles';

const GITHUB_LINK = 'https://github.com/oakslab/Timer';

const Timer = () => {
  const { min = '', time = '' } = useParams();
  const [timer, setTimer] = useState(0);
  const [isTimeup, setIsTimeUp] = useState(false);
  const [isTimerStarted, setIsTimerStarted] = useState(true);

  const endDate = useMemo(() => {
    const [day, month, year, hour, minute, sec] = time.split(':');
    if (hour && minute && sec) return new Date(year, month, day, hour, minute, sec);
    const date = new Date();
    date.setHours(day);
    date.setMinutes(month);
    date.setSeconds(year);
    return date;
  }, [time]);

  // timer is in seconds
  const formatLeftTime = useCallback((timer) => {
    const hours = Math.floor(timer / 3600);
    const mins = Math.floor((timer - hours * 3600) / 60);
    const seconds = timer - hours * 3600 - mins * 60;
    return `
    ${hours < 10 ? `0${hours}` : hours} :
    ${mins < 10 ? `0${mins}` : mins} :
    ${seconds < 10 ? `0${seconds}` : seconds}`;
  }, []);

  const diffCalculate = useCallback(() => {
    const now = new Date();
    const leftSeconds = differenceInSeconds(endDate, now);

    if (leftSeconds <= 0) setIsTimeUp(true);
    return leftSeconds;
  }, [endDate]);

  const [duration, percentage] = useMemo(() => {
    const leftSeconds = diffCalculate();
    const diffMinutes = leftSeconds / 60;
    const percentage = diffMinutes / min;
    return [leftSeconds, percentage];
  }, [diffCalculate, min]);

  useEffect(() => {
    setTimer(duration);
  }, [duration]);

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = diffCalculate();
      setTimer(diff);

      if (diff > min * 1000) setIsTimerStarted(false);
      if (diff <= 0) clearInterval(interval);
    }, 500);
  }, [setTimer, diffCalculate, min, isTimerStarted]);

  if (isTimeup || !isTimerStarted) {
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
        <S.Text>{!isTimerStarted ? 'Timer has not been started' : `Time is up`}</S.Text>
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
        <S.Sand isUpper duration={duration} percentage={percentage} />
      </S.HourGlassPart>
      <S.HourGlassPart>
        <S.Sand duration={duration} percentage={1 - percentage} />
      </S.HourGlassPart>
    </S.Wrapper>
  );
};

export default Timer;
