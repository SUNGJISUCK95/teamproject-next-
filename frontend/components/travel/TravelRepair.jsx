export function TravelRepair({
                              key,
                              idx,
                              rid,
                              rname,
                              rlike,
                              score,
                              evaluation,
                              tag,
                              image1,
                              image2,
                              image3,
                              fullImage1,
                              fullImage2,
                              fullImage3,
                              description,
                              handleDetail,
                              type}) {
    return(
        <div className='food-list-item' onClick={() => {handleDetail(type, rid)}}>
          <ul className="food-title-box">
            <li className="food-title">
              <span className="food-title-fid">{idx}. </span>
              <span className="food-title-fname">{rname}</span>
            </li>
            <li>
              <span className="food-title-score">{score}</span><span>점</span>
              <span className="food-title-flike"><i className="fa-solid fa-star"></i> {rlike}</span>
              <span className="food-title-evaluation">({evaluation}명)</span>
            </li>
          </ul>
          <ul className="food-tag-box">
              {tag && JSON.parse(tag).map((tagItem, idx) => (
                <button
                  className={idx < 2 ? "food-tag" : "food-tag food-tag-sub"}
                  key={idx}
                >
                  {tagItem}
                </button>
              ))}
          </ul>
          <img className="food-image" src={image1}></img>
          <img className="food-image" src={image2}></img>
          <img className="food-image" src={image3}></img>
          <li className="food-description">"{description}"</li>
        </div>
    );
}