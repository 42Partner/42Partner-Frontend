const ConvertMap = new Map();
ConvertMap.set('MEAL', '밥트너');
ConvertMap.set('STUDY', '공트너');

ConvertMap.set('SEOCHO', '서초');
ConvertMap.set('GAEPO', '개포');
ConvertMap.set('OUT_OF_CLUSTER', '기타');

ConvertMap.set('BREAKFAST', '아침');
ConvertMap.set('LUNCH', '점심');
ConvertMap.set('DINNER', '저녁');
ConvertMap.set('DUNCH', '점저');
ConvertMap.set('MIDNIGHT', '야식');

ConvertMap.set('RANDOM', '랜덤매칭');
ConvertMap.set('MANUAL', '방매칭');

ConvertMap.set('INNER_CIRCLE', '42과제');
ConvertMap.set('NOT_INNER_CIRCLE', '기타 공부');

ConvertMap.set('DELIVERY', '배달');
ConvertMap.set('EATOUT', '외식');
ConvertMap.set('TAKEOUT', '포장');

ConvertMap.set(0, 'MATCH_ABSENT');
ConvertMap.set(1, 'MATCH_REVIEW_1');
ConvertMap.set(2, 'MATCH_REVIEW_2');
ConvertMap.set(3, 'MATCH_REVIEW_3');
ConvertMap.set(4, 'MATCH_REVIEW_4');
ConvertMap.set(5, 'MATCH_REVIEW_5');

export default ConvertMap;
