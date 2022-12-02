import ConvertMap from '../components/common/ConvertMap';
import client from './client';

export const writeReview = ({ reviewList, matchId }) => {
  const memberReviewDtos = reviewList.map((m) => ({
    nickname: m.nickname,
    activityMatchScore: ConvertMap.get(m.activityMatchScore),
  }));

  return client.post(
    `/api/matches/${matchId}/review`,
    JSON.stringify({
      matchId,
      memberReviewDtos,
    }),
  );
};

export default writeReview;
