import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import HistroyList from '../history/HistroyList';
import '../../styles/Matching.scss';
import Instance from '../common/Instance';

const MatchingHistory = () => {
  const [matches, setMatches] = useState([]);
  useEffect(() => {
    const getMatches = async () => {
      try {
        const history = await Instance.get(
          `${process.env.REACT_APP_API_KEY}/matches`,
        );
        console.log(matches);

        // const history = {
        //   content: [
        //     {
        //       contentCategory: 'MEAL',
        //       createdAt: '2022-11-14T07:58:26.501Z',
        //       matchConditionDto: {
        //         placeList: 'SEOCHO',
        //         timeOfEatingList: 'BREAKFAST',
        //         wayOfEatingList: 'DELIVERY',
        //       },
        //       matchId: '1f3dda35-3739-406c-ad22-eed438831d66',
        //       matchStatus: 'MATCHED',
        //       methodCategory: 'RANDOM',
        //       participantNum: 4,
        //     },
        //     {
        //       contentCategory: 'STUDY',
        //       createdAt: '2022-11-15T07:58:26.501Z',
        //       matchConditionDto: {
        //         placeList: 'GAEPO',
        //         typeOfStudyList: 'INNER_CIRCLE',
        //         wayOfEatingList: 'DELIVERY',
        //       },
        //       matchId: '2f3dda35-3739-406c-ad22-eed438831d66',
        //       matchStatus: 'MATCHED',
        //       methodCategory: 'MANUAL',
        //       participantNum: 4,
        //     },
        //     {
        //       contentCategory: 'MEAL',
        //       createdAt: '2022-11-16T07:58:26.501Z',
        //       matchConditionDto: {
        //         placeList: 'GAEPO',
        //         timeOfEatingList: 'BREAKFAST',
        //         wayOfEatingList: 'DELIVERY',
        //       },
        //       matchId: '3f3dda35-3739-406c-ad22-eed438831d66',
        //       matchStatus: 'MATCHED',
        //       methodCategory: 'MANUAL',
        //       participantNum: 4,
        //     },
        //     {
        //       contentCategory: 'MEAL',
        //       createdAt: '2022-11-16T07:58:26.501Z',
        //       matchConditionDto: {
        //         placeList: 'GAEPO',
        //         timeOfEatingList: 'BREAKFAST',
        //         wayOfEatingList: 'DELIVERY',
        //       },
        //       matchId: '4f3dda35-3739-406c-ad22-eed438831d66',
        //       matchStatus: 'MATCHED',
        //       methodCategory: 'MANUAL',
        //       participantNum: 4,
        //     },
        //     {
        //       contentCategory: 'MEAL',
        //       createdAt: '2022-11-16T07:58:26.501Z',
        //       matchConditionDto: {
        //         placeList: 'GAEPO',
        //         timeOfEatingList: 'BREAKFAST',
        //         wayOfEatingList: 'DELIVERY',
        //       },
        //       matchId: '5f3dda35-3739-406c-ad22-eed438831d66',
        //       matchStatus: 'MATCHED',
        //       methodCategory: 'MANUAL',
        //       participantNum: 4,
        //     },
        //     {
        //       contentCategory: 'MEAL',
        //       createdAt: '2022-11-16T07:58:26.501Z',
        //       matchConditionDto: {
        //         placeList: 'GAEPO',
        //         timeOfEatingList: 'BREAKFAST',
        //         wayOfEatingList: 'DELIVERY',
        //       },
        //       matchId: '6f3dda35-3739-406c-ad22-eed438831d66',
        //       matchStatus: 'MATCHED',
        //       methodCategory: 'MANUAL',
        //       participantNum: 4,
        //     },
        //     {
        //       contentCategory: 'MEAL',
        //       createdAt: '2022-11-16T07:58:26.501Z',
        //       matchConditionDto: {
        //         placeList: 'GAEPO',
        //         timeOfEatingList: 'BREAKFAST',
        //         wayOfEatingList: 'DELIVERY',
        //       },
        //       matchId: '7f3dda35-3739-406c-ad22-eed438831d66',
        //       matchStatus: 'MATCHED',
        //       methodCategory: 'MANUAL',
        //       participantNum: 4,
        //     },
        //     {
        //       contentCategory: 'MEAL',
        //       createdAt: '2022-11-16T07:58:26.501Z',
        //       matchConditionDto: {
        //         placeList: 'GAEPO',
        //         timeOfEatingList: 'BREAKFAST',
        //         wayOfEatingList: 'DELIVERY',
        //       },
        //       matchId: '8f3dda35-3739-406c-ad22-eed438831d66',
        //       matchStatus: 'MATCHED',
        //       methodCategory: 'MANUAL',
        //       participantNum: 4,
        //     },
        //     {
        //       contentCategory: 'MEAL',
        //       createdAt: '2022-11-16T07:58:26.501Z',
        //       matchConditionDto: {
        //         placeList: 'GAEPO',
        //         timeOfEatingList: 'BREAKFAST',
        //         wayOfEatingList: 'DELIVERY',
        //       },
        //       matchId: '9f3dda35-3739-406c-ad22-eed438831d66',
        //       matchStatus: 'MATCHED',
        //       methodCategory: 'MANUAL',
        //       participantNum: 4,
        //     },
        //     {
        //       contentCategory: 'MEAL',
        //       createdAt: '2022-11-16T07:58:26.501Z',
        //       matchConditionDto: {
        //         placeList: 'GAEPO',
        //         timeOfEatingList: 'BREAKFAST',
        //         wayOfEatingList: 'DELIVERY',
        //       },
        //       matchId: '103dda35-3739-406c-ad22-eed438831d66',
        //       matchStatus: 'MATCHED',
        //       methodCategory: 'MANUAL',
        //       participantNum: 4,
        //     },
        //     {
        //       contentCategory: 'MEAL',
        //       createdAt: '2022-11-16T07:58:26.501Z',
        //       matchConditionDto: {
        //         placeList: 'GAEPO',
        //         timeOfEatingList: 'BREAKFAST',
        //         wayOfEatingList: 'DELIVERY',
        //       },
        //       matchId: '113dda35-3739-406c-ad22-eed438831d66',
        //       matchStatus: 'MATCHED',
        //       methodCategory: 'MANUAL',
        //       participantNum: 4,
        //     },
        //   ],
        // };
        setMatches(...matches, history.content);
        console.log(matches);
      } catch (e) {
        Promise.reject(e);
      }
    };
    getMatches();
  }, []);

  if (!matches)
    return <div className="matching-history-wrapper">No Matching History</div>;

  return (
    <div className="matching-history-wrapper">
      {console.log(matches)}
      {matches.map((match) => (
        <HistroyList key={match.matchId} match={match} />
      ))}
    </div>
  );
};

export default MatchingHistory;
