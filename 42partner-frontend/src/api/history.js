import ConvertMap from '../components/common/ConvertMap';
import instance from './api';

export const writeReview = ({ reviewList, matchId }) => {
  const memberReviewDtos = reviewList.map((m) => ({
    nickname: m.nickname,
    activityMatchScore: ConvertMap.get(m.activityMatchScore),
  }));

  return instance.post(
    `/api/matches/${matchId}/review`,
    JSON.stringify({
      matchId,
      memberReviewDtos,
    }),
  );
};

export default writeReview;
