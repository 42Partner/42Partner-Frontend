import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../modules/mypage';

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ mypage }) => ({
    user: mypage.user,
  }));
  useEffect(() => {
    dispatch(getProfile());
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
