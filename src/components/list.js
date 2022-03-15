import Listitems from './listitems';
import { throttle } from 'lodash';
import { useEffect, useState, useRef, useCallback } from 'react';

function List({ data }) {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  let [currentIdx, setCurrentIdx] = useState(0);
  const [width, setWidth] = useState(window.innerWidth - 10);
  const [hidden, setHidden] = useState(false);
  let ulRef = useRef();

  const changeBg = useCallback(() => {
    setWidth(window.innerWidth - 10);
  }, []);
  let modifiedData = [data[data.length - 1], ...data, data[0]];

  // TODO : 좌우 스와이프 하면 이동 구현
  const handleGesture = (index) => {
    let targetIdx = 0;
    if (touchEnd < touchStart || (touchStart === 0 && touchEnd === 0)) {
      targetIdx = index + 1; // 다음 슬라이드 인덱스로 이동
    } else if (touchEnd > touchStart) {
      targetIdx = index - 1; // 이전 슬라이드 인덱스로 이동
    }
    if (targetIdx <= 0 && touchStart !== 0 && touchEnd !== 0) {
      setCurrentIdx(targetIdx);
      setTimeout(() => {
        setCurrentIdx(modifiedData.length - 2);
      }, 500); // 1초 있다가 한번 더 바꿈
    } else if (targetIdx >= modifiedData.length - 1) {
      setCurrentIdx(targetIdx);
      setTimeout(() => {
        setCurrentIdx(1);
      }, 500); // 1초 있다가 한번 더 바꿈
    } else {
      setCurrentIdx(targetIdx);
    }
  };

  useEffect(() => {
    handleGesture(currentIdx);
  }, [touchEnd]);

  useEffect(() => {
    window.addEventListener('resize', throttle(changeBg, 200));
    return () => {
      window.removeEventListener('resize', changeBg);
    };
  }, [changeBg]);

  return (
    <>
      <div
        id='show'
        onTouchStart={(e) => setTouchStart(e.changedTouches[0].screenX)}
        onTouchEnd={(e) => setTouchEnd(e.changedTouches[0].screenX)}
      >
        <ul
          ref={ulRef}
          id='list'
          className={hidden ? 'hidden' : 'show'}
          style={{
            transform: `translateX(-${currentIdx * width}px)`,
            transition: `${
              currentIdx <= 1 || currentIdx > modifiedData.length - 1
                ? ''
                : 'all 0.5s'
            }`,
          }}
        >
          {modifiedData.map((el, idx) => {
            return (
              <Listitems
                key={idx}
                idx={idx}
                data={el}
                hidden={hidden}
                setHidden={setHidden}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default List;
