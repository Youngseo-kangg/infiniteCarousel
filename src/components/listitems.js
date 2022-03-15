import heart from '../images/heart.svg';
import star from '../images/star.svg';

function Listitems({ data, idx, hidden, setHidden }) {
  let keywords = data.keyword.reduce((acc, cur, idx) => {
    if (idx + 1 === data.keyword.length) {
      return (acc += `#${cur}`);
    } else {
      return (acc += `#${cur}, `);
    }
  }, '');
  return (
    <li className='listitemWrapper'>
      <button className='swipeDown' onClick={() => setHidden(!hidden)}></button>
      <div className='listitem'>
        <img src={data.image} alt={`${data.nm} 대표사진`} />
        <section>
          <div className='mapInfo'>
            <h1>
              {idx + 1}. {data.nm}
            </h1>
            <div className='geoInfo'>
              <p>{data.area}</p>
              <p>{data.distance}</p>
            </div>
          </div>
          <p>{data.category}</p>
          <p className='keywords'>{keywords}</p>
          <div className='numberInfo'>
            <div className='scoreInfo'>
              <p>
                <span>{data.score}</span>점
              </p>
            </div>
            <div className='starInfo'>
              <img src={star} alt='별점' />
              <p>
                {data.user_score} ({data.review_cnt}명)
              </p>
            </div>
            <div className='heartInfo'>
              <img src={heart} alt='찜한 유저수' />
              <p>{data.favorites_cnt}</p>
            </div>
          </div>
        </section>
      </div>
    </li>
  );
}

export default Listitems;
