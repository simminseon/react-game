import React from 'react';

export const WordRelay = () => {
  const [word, setWord] = React.useState('심민선');
  const [value, setValue] = React.useState('');
  const [result, setResult] = React.useState('');
  const inputRef = React.useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if(word[word.length - 1] === value[0]) {
      setResult('정답!');
      setWord(value);
      setValue('');
      inputRef.current.focus();
    } else {
      setResult('실패!');
      setValue('');
      inputRef.current.focus();
    }
  }

  const onChangeInput = (e) => {
    setValue(e.target.value);
  }

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <label htmlFor="wordInput">글자를 입력하세요</label>
        <input id="wordInput" ref={inputRef} value={value} onChange={onChangeInput} />
        <button className="ss">입력!</button>
      </form>
      <div>{result}</div>
    </>
  );
}

// export default WordRelay;