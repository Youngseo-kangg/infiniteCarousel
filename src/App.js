import './reset.css';
import './App.css';
import bg from './images/bg.png';
import bg2x from './images/bg@2x.png';
import bg3x from './images/bg@3x.png';
import List from './components/list';
import testData from './testData.json';
import { useEffect, useState, useCallback } from 'react';
import { throttle } from 'lodash';

function App() {
  let data = testData;
  const [backgroundImg, setBackgroundImg] = useState(bg3x);
  const changeBg = useCallback(() => {
    if (window.innerWidth < 360 || window.innerHeight < 640) {
      setBackgroundImg(bg); // 핸드폰 화면
    } else if (window.innerWidth < 720 || window.innerHeight < 1280) {
      setBackgroundImg(bg2x); // 태블릿 화면
    } else {
      setBackgroundImg(bg3x); // 모니터 화면
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', throttle(changeBg, 200));
    return () => {
      window.removeEventListener('resize', changeBg);
    };
  }, [changeBg]);

  return (
    <div className='App' style={{ backgroundImage: `url(${backgroundImg})` }}>
      <List data={data} />
    </div>
  );
}

export default App;
