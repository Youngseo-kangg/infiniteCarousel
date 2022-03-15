import Listitems from './listitems';
import { throttle } from 'lodash';
import { useEffect, useState, useRef, useCallback } from 'react';

function List({ data }) {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  let [currentIdx, setCurrentIdx] = useState(0);
  const [width, setWidth] = useState(window.innerWidth - 10);
  const [hidden, setHidden] = useState(false);
  const needData = 1;
  let ulRef = useRef();

  const changeBg = useCallback(() => {
    setWidth(window.innerWidth - 10);
  }, []);

  // TODO : 무한 스와이프 위해 요소 복제
  const handleData = () => {
    let addedFront = [];
    let addedLast = [];
    let count = 0;
    // 복사해서 집어넣기
    while (count < needData) {
      addedLast.push(data[currentIdx % data.length]);
      addedFront.push(data[data.length - 1 - (currentIdx % data.length)]);
      count++;
    }
    return [...addedFront, ...data, ...addedLast];
  };
  let modifiedData = handleData();

  // TODO : 좌우 스와이프 하면 이동 구현
  const handleGesture = (index) => {
    let targetIdx = 0;
    // 맨 마지막 슬라이드를 복제한 슬라이드에서 움직인 경우
    if (index === -1) {
      if (touchEnd < touchStart) {
        targetIdx = 1; // 다음 슬라이드로 이동
      } else if (touchEnd > touchStart) {
        targetIdx = data.length - 1; // 이전 슬라이드로 이동
      }
    }
    if (touchEnd < touchStart) {
      targetIdx = index + 1; // 다음 슬라이드로 이동
    } else if (touchEnd > touchStart) {
      targetIdx = index - 1; // 이전 슬라이드로 이동
    }
    if (targetIdx < 0) {
      targetIdx = data.length - 1;
    } else if (targetIdx > data.length - 1) {
      targetIdx = 1;
    }

    setCurrentIdx(targetIdx);
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
          onClick={() => setHidden(!hidden)}
          className={hidden ? 'hidden' : 'show'}
          style={{
            transform: `translateX(-${currentIdx * width}px)`,
            transition: `${
              currentIdx < 0 || currentIdx > data.length - 1 ? '' : 'all 0.5s'
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
