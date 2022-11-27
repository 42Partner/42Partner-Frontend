import React, { useState, useEffect } from 'react';
// import axios from 'axios';

const History = () => {
  //   const matches = {
  //     content: [
  //       {
  //         contentCategory: 'MEAL',
  //         createdAt: '2022-11-14T07:58:26.501Z',
  //         matchConditionDto: {
  //           placeList: 'SEOCHO',
  //           timeOfEatingList: 'BREAKFAST',
  //           typeOfStudyList: 'INNER_CIRCLE',
  //           wayOfEatingList: 'DELIVERY',
  //         },
  //         matchId: '4f3dda35-3739-406c-ad22-eed438831d66',
  //         matchStatus: 'MATCHED',
  //         methodCategory: 'RANDOM',
  //         participantNum: 4,
  //       },
  //     ],
  //   };
  const [num, setNum] = useState(0);
  useEffect(() => {
    const getNum = async () => {
      try {
        // console.log(matches);
        // console.log(matches.content);
        // console.log(matches.content[0].participantNum);

        // const history = await axios.get(
        //   `${process.env.REACT_APP_API_KEY}/matches`,
        // );

        // setNum(history.content[0].participantNum);
        setNum(0);
      } catch (e) {
        Promise.reject(e);
      }
    };

    getNum();
  }, []);

  return (
    <div className="card profile-header">
      <div className="body">
        <div className="score-description" style={{ textAlign: 'center' }}>
          <h2>매칭 횟수</h2>
          <span
            style={{
              fontSize: '40px',
              color: 'lightpink',
            }}
          >
            {num}
          </span>
        </div>
      </div>
    </div>
  );
};

export default History;
