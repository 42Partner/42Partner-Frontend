import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Instance from '../common/Instance';

const Profile = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await Instance.get(
          `${process.env.REACT_APP_API_KEY}/users/5caab2b6-8da4-474e-8a67-2b157acedf0a`,
        );
        setUser(userData.data);
      } catch (e) {
        console.log(e);
      }
    };

    getUser();
  }, []);
  console.log(user);

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
                    `https://profile.intra.42.fr/users/${user.oauth2Username}`,
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
