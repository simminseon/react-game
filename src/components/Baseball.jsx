import React from 'react';

// 숫자 4개를 랜덤하게 뽑는 함수
function getNumbers() {
  console.log('test')
  const candidate = [1,2,3,4,5,6,7,8,9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
};

export const Baseball = React.memo(() => {
  const [ result, setResult ] = React.useState('');
  const [ value, setValue ] = React.useState('');
  const [ answer, setAnswer ] = React.useState(getNumbers());
  const [ tries, setTries ] = React.useState([]);
  const inputEl = React.useRef(null);

  const onSumbmitForm = (e) => {
    e.preventDefault();
    if(value === answer.join('')) {
      setResult('홈런!');
      setAnswer(value);
      setValue('');
    } else {
      const answerArray = value.split('').map(v => parseInt(v));
      console.log('answerArray: ', answerArray)
      let strike = 0;
      let ball = 0;
      if(tries.length >= 9) {
        setResult(`10번 넘게 틀려서 실격! 답은 ${answer.join(',')}였습니다`);
        alert('게임을 다시 시작합니다!');
        setValue('');
        setAnswer(getNumbers());
        setTries([]);
        inputEl.current.focus();
      } else {
        for(let i = 0; i < 4; i += 1) {
          if(answerArray[i] === answer[i]) {
            strike += 1;
          } else if(answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        setTries((prevTries) => [...prevTries, { try: value, result: `${strike} 스트라이크, ${ball} 볼 입니다` }]);
        setValue('');
        inputEl.current.focus();
      }
    }
  }

  const onChangeInput = (e) => {
    setValue(e.target.value);
  }
  

  const Try = React.memo(({ tryInfo }) => {
    return (
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    );
  });

  return (
    <>
    <h1>{result}</h1>
    <form onSubmit={onSumbmitForm}>
      <input ref={inputEl} maxLength="4" value={value} onChange={onChangeInput} />
    </form>
    <div>시도 : {tries.length}</div>
    <ul>
      {tries.map((data) => {
        return <Try tryInfo={data} />
      })}
    </ul>
    </>
  );
});

// export default Baseball; => import Baseball ~
// export const Baseball; => import { Baseball } ~

