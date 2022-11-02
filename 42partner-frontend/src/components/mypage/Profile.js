import React from 'react';
import { CardHeader, Avatar } from '@material-ui/core/index';

const Profile = () => {
  return (
    <div>
      <CardHeader
        avatar={<Avatar alt="profile-img" src="choco.jpeg" />}
        title="cadet name"
      />
    </div>
  );
};

export default Profile;
