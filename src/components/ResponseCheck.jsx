import React from 'react';

export function ResponseCheck() {
  const [state, setState] = React.useState('waiting');
  const [message, setMessage] = React.useState('클릭해서 시작하세요');
  const [result, setResult] = React.useState([]);
  const timeout = React.useRef(null);
  const startTime = React.useRef();
  const endTime = React.useRef();


  const onClickScreen = () => {
    if(state === 'waiting') {
      timeout.current = setTimeout(() => {
        setState('now');
        setMessage('클릭!!!!!');
        startTime.current = new Date();
      },Math.floor(Math.random() * 1000) + 2000); // 2초 ~ 3초 랜덤
      setState('ready');
      setMessage('초록색이 되면 클릭하세요');
    } else if (state === 'ready') { // 성급하게 클릭
      clearTimeout(timeout.current);
      setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요~');
      setState('waiting');
    } else if (state === 'now') { // 반응속도 체크
      endTime.current = new Date();
      console.log(endTime.current)
      setState('waiting');
      setMessage('클릭해서 시작하세요');
      setResult((prevResult) => {
        return [ ...prevResult, endTime.current - startTime.current]
      });
    }
  }

  const onReset = () => {
    setResult([])
  }

  return (
    <>
    <div 
      id="screen" 
      className={state} 
      onClick={onClickScreen}
    >
      {message}
    </div>
    {result.length === 0 ? null : <div>평균 시간 :{result.reduce((a, c) => a + c) / result.length}ms</div>}
    <button onClick={onReset}>Reset</button>
    </>
  );
}