import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Mypage.scss';
import Button from '@mui/material/Button';

const Profile = () => {
  const userURL = `http://15.165.146.60:8080/api/users/`;
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await axios.get(
          `${userURL}04bfd039-7fad-4346-a123-462e0f20db7e`,
        );
        setUsers(user.data);
      } catch (e) {
        console.log(e);
      }
    };

    getUser();
  }, []);

  if (!users) return null;
  return (
    <div className="card profile-header">
      <div className="body">
        <div className="row">
          <div className="profile-image">
            <img src={users.imageUrl} alt="profile-img" />
          </div>
          <div className="profile-description">
            <h2 className="profile-name">{users.nickname}</h2>
            <p className="profile-email">{users.email}</p>
            <div style={{ paddingTop: '10px' }}>
              <Button
                style={{ backgroundColor: 'lightPink', fontFamily: 'ubuntu' }}
                variant="contained"
                onClick={() =>
                  window.open(
                    `https://profile.intra.42.fr/users/${users.nickname}`,
                    '_blank',
                  )
                }
                type="button"
              >
                Intra profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
