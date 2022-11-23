import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Mypage.scss';
import Button from '@mui/material/Button';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await axios.get(
          `${process.env.REACT_APP_API_KEY}/users/3128dd03-82d9-4f93-b7eb-c2f74b3e2cf4`,
        );
        setUser(userData.data);
      } catch (e) {
        console.log(e);
      }
    };

    getUser();
  }, []);

  if (!user) return null;
  return (
    <div className="card profile-header">
      <div className="body">
        <div className="row">
          <div className="profile-image">
            <img src={user.imageUrl} alt="profile-img" />
          </div>
          <div className="profile-description">
            <h2 className="profile-name">{user.nickname}</h2>
            <p className="profile-email">{user.email}</p>
            <div style={{ paddingTop: '10px' }}>
              <Button
                style={{
                  backgroundColor: 'lightpink',
                  fontFamily: 'ubuntu-regular',
                }}
                variant="contained"
                onClick={() =>
                  window.open(
                    `https://profile.intra.42.fr/users/${user.nickname}`,
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
