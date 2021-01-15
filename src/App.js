import './App.css';
import { WordRelay } from './components/WordRelay';
import { Baseball } from './components/Baseball';
import RenderTest from './components/RenderTest';
import { ResponseCheck } from './components/ResponseCheck';
import { RSP } from './components/RSP';
import { Lotto } from './components/Lotto';

function App() {
  return (
    <div className="App">
      <WordRelay />
      <Baseball />
      <RenderTest />
      <ResponseCheck />
      {/* <RSP /> */}
      <Lotto />
    </div>
  );
}

export default App;
