import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import HistroyList from '../history/HistroyList';
import '../../styles/Matching.scss';

const MatchingHistory = () => {
  const [matches, setMatches] = useState([]);
  useEffect(() => {
    const getMatches = async () => {
      try {
        // console.log(matches);
        // console.log(matches.content);
        // console.log(matches.content[0].participantNum);

        // const history = await axios.get(
        //   `${process.env.REACT_APP_API_KEY}/matches`,
        // );

        const history = {
          content: [
            {
              contentCategory: 'MEAL',
              createdAt: '2022-11-14T07:58:26.501Z',
              matchConditionDto: {
                placeList: 'SEOCHO',
                timeOfEatingList: 'BREAKFAST',
                wayOfEatingList: 'DELIVERY',
              },
              matchId: '4f3dda35-3739-406c-ad22-eed438831d66',
              matchStatus: 'MATCHED',
              methodCategory: 'RANDOM',
              participantNum: 4,
            },
            {
              contentCategory: 'STUDY',
              createdAt: '2022-11-15T07:58:26.501Z',
              matchConditionDto: {
                placeList: 'GAEPO',
                typeOfStudyList: 'INNER_CIRCLE',
                wayOfEatingList: 'DELIVERY',
              },
              matchId: '4f3dda35-3739-406c-ad22-eed438831d66',
              matchStatus: 'MATCHED',
              methodCategory: 'MANUAL',
              participantNum: 4,
            },
            {
              contentCategory: 'MEAL',
              createdAt: '2022-11-16T07:58:26.501Z',
              matchConditionDto: {
                placeList: 'GAEPO',
                timeOfEatingList: 'BREAKFAST',
                wayOfEatingList: 'DELIVERY',
              },
              matchId: '4f3dda35-3739-406c-ad22-eed438831d66',
              matchStatus: 'MATCHED',
              methodCategory: 'MANUAL',
              participantNum: 4,
            },
            {
              contentCategory: 'MEAL',
              createdAt: '2022-11-16T07:58:26.501Z',
              matchConditionDto: {
                placeList: 'GAEPO',
                timeOfEatingList: 'BREAKFAST',
                wayOfEatingList: 'DELIVERY',
              },
              matchId: '4f3dda35-3739-406c-ad22-eed438831d66',
              matchStatus: 'MATCHED',
              methodCategory: 'MANUAL',
              participantNum: 4,
            },
            {
              contentCategory: 'MEAL',
              createdAt: '2022-11-16T07:58:26.501Z',
              matchConditionDto: {
                placeList: 'GAEPO',
                timeOfEatingList: 'BREAKFAST',
                wayOfEatingList: 'DELIVERY',
              },
              matchId: '4f3dda35-3739-406c-ad22-eed438831d66',
              matchStatus: 'MATCHED',
              methodCategory: 'MANUAL',
              participantNum: 4,
            },
            {
              contentCategory: 'MEAL',
              createdAt: '2022-11-16T07:58:26.501Z',
              matchConditionDto: {
                placeList: 'GAEPO',
                timeOfEatingList: 'BREAKFAST',
                wayOfEatingList: 'DELIVERY',
              },
              matchId: '4f3dda35-3739-406c-ad22-eed438831d66',
              matchStatus: 'MATCHED',
              methodCategory: 'MANUAL',
              participantNum: 4,
            },
            {
              contentCategory: 'MEAL',
              createdAt: '2022-11-16T07:58:26.501Z',
              matchConditionDto: {
                placeList: 'GAEPO',
                timeOfEatingList: 'BREAKFAST',
                wayOfEatingList: 'DELIVERY',
              },
              matchId: '4f3dda35-3739-406c-ad22-eed438831d66',
              matchStatus: 'MATCHED',
              methodCategory: 'MANUAL',
              participantNum: 4,
            },
            {
              contentCategory: 'MEAL',
              createdAt: '2022-11-16T07:58:26.501Z',
              matchConditionDto: {
                placeList: 'GAEPO',
                timeOfEatingList: 'BREAKFAST',
                wayOfEatingList: 'DELIVERY',
              },
              matchId: '4f3dda35-3739-406c-ad22-eed438831d66',
              matchStatus: 'MATCHED',
              methodCategory: 'MANUAL',
              participantNum: 4,
            },
            {
              contentCategory: 'MEAL',
              createdAt: '2022-11-16T07:58:26.501Z',
              matchConditionDto: {
                placeList: 'GAEPO',
                timeOfEatingList: 'BREAKFAST',
                wayOfEatingList: 'DELIVERY',
              },
              matchId: '4f3dda35-3739-406c-ad22-eed438831d66',
              matchStatus: 'MATCHED',
              methodCategory: 'MANUAL',
              participantNum: 4,
            },
            {
              contentCategory: 'MEAL',
              createdAt: '2022-11-16T07:58:26.501Z',
              matchConditionDto: {
                placeList: 'GAEPO',
                timeOfEatingList: 'BREAKFAST',
                wayOfEatingList: 'DELIVERY',
              },
              matchId: '4f3dda35-3739-406c-ad22-eed438831d66',
              matchStatus: 'MATCHED',
              methodCategory: 'MANUAL',
              participantNum: 4,
            },
            {
              contentCategory: 'MEAL',
              createdAt: '2022-11-16T07:58:26.501Z',
              matchConditionDto: {
                placeList: 'GAEPO',
                timeOfEatingList: 'BREAKFAST',
                wayOfEatingList: 'DELIVERY',
              },
              matchId: '4f3dda35-3739-406c-ad22-eed438831d66',
              matchStatus: 'MATCHED',
              methodCategory: 'MANUAL',
              participantNum: 4,
            },
          ],
        };
        setMatches(...matches, history.content);
      } catch (e) {
        Promise.reject(e);
      }
    };
    getMatches();
  }, []);

  return (
    <div className="matching-history-wrapper">
      {/* {console.log(matches)} */}
      {matches.map((match) => (
        <HistroyList match={match} />
      ))}
    </div>
  );
};

export default MatchingHistory;
