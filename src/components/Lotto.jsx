import React from 'react';
import { Ball } from './Ball';

function getWinNumbers() {
  console.log('getWinNumbers');
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while(candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bounusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort(function(p, c) {return p - c});
  return [...winNumbers, bounusNumber];
}

export const Lotto = () => {
  const [ winNumbers, setWinNumbers ] = React.useState(getWinNumbers()); // 당첨숫자들
  const [ winBalls, setWinBalls ] = React.useState([]); // 보너스 공
  const [ bounus, setBounus ] = React.useState(null);
  const [ redo, setRedo ] = React.useState(false);
  const timeouts = React.useRef([]);

  React.useEffect(() => {
    console.log('useEffect');
    for(let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]])
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBounus(winNumbers[6]);
      setRedo(true);
    }, 7000);
    return () => {
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      })
    }
  }, [winBalls.length === 0]); // 빈 배열이면 componentDidMount와 동일
  // 베열에 요소가 있으면 componentDidMount랑 componentDidUpdate 둘 다 수행

  const onClickRedo = () => {
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBounus(null);
    setRedo(false);
    timeouts.current = [];
  }

  return (
    <>
    <div>당첨 숫자</div>
    <div id="결과창">
      {winBalls.map((v) => <Ball key={v} number={v} />)}
    </div>
    <div>보너스!</div>
    {bounus && <Ball number={bounus} />}
    {redo && <button onclick={onClickRedo}>한번 더!</button>}
    </>
  );
}