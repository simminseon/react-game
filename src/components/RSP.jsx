import React, { useEffect } from 'react';

// 클래스의 경우 -> constructor -> render -> ref -> componentDidMount -> (setState/props 바뀔때 -> shouldComponentUpdate -> render -> componentDidUpdate) -> 부모가 나를 없앴을 때 -> componentWillUnMount 소멸


// componentDidMount() {} 컴포넌트가 첫 렌더링된 후, 여기에 비동기 요청을 많이 함
// componentDidUpdate() {} 리렌더링된 후 실행됨
// componentWillUnMount() {} 컴포넌트가 제거되기 직전, 부모에 의해 나의 컴포넌트가 없애졌을 때, 비동기 요청 정리를 많이 함


//                               result, imgCord, score
// componentDidMount
// componentDidUpdate
// componentWillUnmount


// 클래스에서는 한번에
// componentDidMount() {
//   this.setState({
//     imgCord: 3,
//     score: 1,
//     result: 2
//   })
// }

// 클래스에서는 따로 처리
// useEffect(() => {
//   setImgCord();
//   setScore();
// }, [imgCord, score]);

// useEffect(() => {
//   setImgCord();
//   setScore();
// }, [result]);


const rspCords = {
  바위: '0',
  가위: '-142px',
  보: '-284px'
};

const scores = {
  바위: 1,
  가위: 0,
  보: -1
}

const computerChoice = (imgCord) => {
  return Object.entries(rspCords).find(function(v) {
    return v[1] === imgCord;
  })[0];
}

export const RSP = React.memo(() => {
  const [ result, setResult ] = React.useState('');
  const [ imgCord, setImgCord ] = React.useState(rspCords.바위);
  const [ score, setScore ] = React.useState(0);

  const interval = React.useRef();

  React.useEffect(() => { // componentDidMount, componentDidUpdate 역할(1대1 대응은 아님)
    console.log('다시 실행');
    interval.current = setInterval(changeHand, 100);
    return () => { // componentWillMount 역할
      console.log('종료');
      clearInterval(interval.current)
    }
  }, [imgCord]); // -> 값이 안들어 있으면 componentDidMount 역할, 값이 들어가 있으면 componentDidUpdate 역할

  const changeHand = () => {
    if(imgCord === rspCords.바위) {
      setImgCord(rspCords.가위);
    } else if (imgCord === rspCords.가위) {
      setImgCord(rspCords.보);
    } else if (imgCord === rspCords.보) {
      setImgCord(rspCords.바위);
    }
  }

  const onClickBtn = (choice) => {
    clearInterval(interval.current);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCord)];
    const diff = myScore - cpuScore;
    if(diff === 0) {
      setResult('비겼습니다!');
    } else if ([-1, 2].includes(diff)) {
      setResult('이겼습니다!')
      setScore((prevScore) => prevScore.score + 1);
    } else {
      setResult('졌습니다!')
      setScore((prevScore) => prevScore.score - 1);
    }
    setTimeout(() => {
      interval.current = setInterval(changeHand, 100);
    }, 1000);

  }

  return (
    <>
    <div id="computer" style={{background:`url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCord} 0`}}></div>
    <div>
      <button id="rock" className="btn" onClick={() => onClickBtn('바위')}>바위</button>
      <button id="scissor" className="btn" onClick={() => onClickBtn('가위')}>가위</button>
      <button id="paper" className="btn" onClick={() => onClickBtn('보')}>보</button>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </div>
    </>
  );
})