import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RoomItem from './RoomItem';
import ModalTemplate from '../common/ModalTemplate';
import CreateRoomForm from './CreateRoomForm';
import '../../styles/RoomList.scss';
import Instance from '../common/Instance';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffe3e3',
    },
  },
});

const RoomList = () => {
  const [open, setOpen] = useState(false);
  const handleWriteOpen = () => {
    setOpen(true);
  };
  const handleWriteClose = () => {
    setOpen(false);
  };

  const [roomList, setRoomList] = useState([]);
  useEffect(() => {
    const getRooms = async () => {
      try {
        const rooms = await Instance.get(
          `${process.env.REACT_APP_API_KEY}/articles`,
        );

        // const rooms = {
        //   content: [
        //     {
        //       nickname: 'takim',
        //       userId: '57c66df8-a988-4285-be58-b6b544bb85bb',
        //       articleId: '21ce5893-8c0f-4b5c-9c46-5ccea3ffea69',
        //       title: '개포에서 2시에 점심 먹으실 분 구합니다.',
        //       content: '서초 클러스터 2시에 치킨 먹으러갈겁니다.',
        //       date: '2022-10-03',
        //       createdAt: '2022-11-16T17:09:58.867621',
        //       anonymity: false,
        //       isToday: false,
        //       participantNumMax: 5,
        //       participantNum: 1,
        //       contentCategory: 'MEAL',
        //       matchConditionDto: {
        //         placeList: ['SEOCHO'],
        //         timeOfEatingList: ['LUNCH', 'DINNER'],
        //         wayOfEatingList: ['EATOUT', 'TAKEOUT'],
        //         typeOfStudyList: [],
        //       },
        //     },
        //     {
        //       nickname: 'sorkim',
        //       userId: '57c66df8-a988-4285-be58-b6b544bb85bb',
        //       articleId: 'a583496a-ee7a-4d54-aac3-f3036ceada0e',
        //       title: '공부할 사람.',
        //       content: 'libft 같이해요',
        //       date: '2022-10-03',
        //       createdAt: '2022-11-16T17:13:52.949767',
        //       anonymity: false,
        //       isToday: true,
        //       participantNumMax: 4,
        //       participantNum: 2,
        //       contentCategory: 'STUDY',
        //       matchConditionDto: {
        //         placeList: ['GAEPO'],
        //         timeOfEatingList: [],
        //         wayOfEatingList: [],
        //         typeOfStudyList: ['INNER_CIRCLE'],
        //       },
        //     },
        //     {
        //       nickname: 'hyenam',
        //       userId: '57c66df8-a988-4285-be58-b6b544bb85bb',
        //       articleId: '56fc7f0b-4b9a-495e-9157-c8177ecf908b',
        //       title: 'ㅎㅇ',
        //       content: ' 클러스터 2시에 치킨 먹으러갈겁니다.',
        //       date: '2022-10-03',
        //       createdAt: '2022-11-16T17:15:40.665124',
        //       anonymity: false,
        //       isToday: false,
        //       participantNumMax: 5,
        //       participantNum: 1,
        //       contentCategory: 'MEAL',
        //       matchConditionDto: {
        //         placeList: ['SEOCHO'],
        //         timeOfEatingList: ['LUNCH'],
        //         wayOfEatingList: ['DELIVERY'],
        //         typeOfStudyList: [],
        //       },
        //     },
        //     {
        //       nickname: 'takim',
        //       userId: '57c66df8-a988-4285-be58-b6b544bb85bb',
        //       articleId: 'cebb8a4a-cfcb-4566-b99c-f1eef18d0b5a',
        //       title: '개포에서 2시에 점심 먹으실 분 구합니다.',
        //       content: '서초 클러스터 2시에 치킨 먹으러갈겁니다.',
        //       date: '2022-10-03',
        //       createdAt: '2022-11-16T17:29:52.510348',
        //       anonymity: true,
        //       isToday: false,
        //       participantNumMax: 5,
        //       participantNum: 1,
        //       contentCategory: 'MEAL',
        //       matchConditionDto: {
        //         placeList: ['SEOCHO'],
        //         timeOfEatingList: [],
        //         wayOfEatingList: [],
        //         typeOfStudyList: [],
        //       },
        //     },
        //     {
        //       nickname: 'takim',
        //       userId: '57c66df8-a988-4285-be58-b6b544bb85bb',
        //       articleId: 'ed992b0e-c078-4b66-b31a-3ed1a0584562',
        //       title: '개포에서 2시에 점심 먹으실 분 구합니다.',
        //       content: '서초 클러스터 2시에 치킨 먹으러갈겁니다.',
        //       date: '2022-11-16',
        //       createdAt: '2022-11-16T17:32:30.563562',
        //       anonymity: false,
        //       isToday: false,
        //       participantNumMax: 5,
        //       participantNum: 1,
        //       contentCategory: 'MEAL',
        //       matchConditionDto: {
        //         placeList: ['SEOCHO'],
        //         timeOfEatingList: ['BREAKFAST'],
        //         wayOfEatingList: ['DELIVERY'],
        //         typeOfStudyList: [],
        //       },
        //     },
        //   ],
        // };
        setRoomList(...roomList, rooms.content);
      } catch (e) {
        Promise.reject(e);
      }
    };
    getRooms();
  }, []);

  return (
    <div className="room-list">
      <ThemeProvider theme={theme}>
        <Fab
          className="create-button"
          color="primary"
          aria-label="add"
          onClick={handleWriteOpen}
        >
          <AddIcon />
        </Fab>
      </ThemeProvider>
      <ModalTemplate open={open} onClose={handleWriteClose}>
        <CreateRoomForm />
      </ModalTemplate>
      {roomList &&
        roomList.map((room) => (
          <RoomItem
            key={room.articleId}
            date={room.date}
            anonymity={room.anonymity}
            nickname={room.nickname}
            title={room.title}
            content={room.content}
            participantNum={room.participantNum}
            participantNumMax={room.participantNumMax}
            isToday={room.isToday}
            contentCategory={room.contentCategory}
            matchConditionDto={room.matchConditionDto}
          />
        ))}
    </div>
  );
};

export default RoomList;
