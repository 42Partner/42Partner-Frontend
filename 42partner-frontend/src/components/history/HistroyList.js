import React, { useState, useEffect } from 'react';
import HistroyItem from './HistroyItem';
import '../../styles/HistroyList.scss';

const HistroyList = () => {
  const [matchData, setMatchData] = useState([]);

  //   const [contentCategory, setContentCategory] = useState('');
  //   const [methodCategory, setMethodCategory] = useState('');
  const result = new Map();
  result.set('MEAL', '밥트너');
  result.set('STUDY', '공트너');
  result.set('SEOCHO', '서초');
  result.set('GAEPO', '개포');
  result.set('OUT_OF_CLUSTER', '클러스터 외');
  result.set('BREAKFAST', '아침');
  result.set('LUNCH', '점심');
  result.set('DINNER', '저녁');
  result.set('MIDNIGHT', '야식');
  result.set('RANDOM', '랜덤매칭');
  result.set('ROOM', '방매칭');
  const matches = {
    content: [
      {
        contentCategory: 'MEAL',
        createdAt: '2022-11-14T07:58:26.501Z',
        matchConditionDto: {
          placeList: ['SEOCHO'],
          timeOfEatingList: ['BREAKFAST'],
          typeOfStudyList: ['INNER_CIRCLE'],
          wayOfEatingList: ['DELIVERY'],
        },
        matchId: '4f3dda35-3739-406c-ad22-eed438831d66',
        matchStatus: 'MATCHED',
        methodCategory: 'RANDOM',
        participantNum: 4,
      },
    ],
  };
  const contentCategory = result.get(matches.content[0].contentCategory);
  const methodCategory = result.get(matches.content[0].methodCategory);

  //   const time = matches.content[0].matchConditionDto.timeOfEatingList.map(
  //     (tel) => result.get(tel),
  //   );
  //   console.log(time);
  //   console.log(matches.content[0].matchConditionDto.timeOfEatingList);
  //   console.log(matches.content[0].methodCategory);

  //   console.log(category);

  useEffect(() => {
    const getMatchData = async () => {
      try {
        // console.log(matches);
        // console.log(matches.content);
        console.log(matches.content[0].participantNum);

        // const history = await axios.get(historyURL);
        setMatchData([
          contentCategory,
          methodCategory,
          matches.content[0].createdAt,
        ]);
        // setContentCategory(matches.content[0].contentCategory);
        // setMethodCategory(matches.content[0].methodCategory);
      } catch (e) {
        console.log(e);
      }
    };

    // console.log(category);
    // console.log(category[0]);
    // console.log(category[1]);
    getMatchData();
  }, []);

  return (
    <div className="history-list">
      <HistroyItem content="Category" method="Matching" date="Date" />
      <HistroyItem
        content={matchData[0]}
        method={matchData[1]}
        // date={matchData[2]}
        date="22-10-12"
      />
    </div>
  );
};

export default HistroyList;
