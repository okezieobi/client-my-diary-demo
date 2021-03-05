import React, { useEffect, useState } from 'react';

import ProfileView from '../views/Profile';
import authServices from '../Auth';
import env from '../../utils/env';

export default function Profile() {
  const [profile, setProfile] = useState({
    fullName: '', email: '', username: '', createdAt: '', updatedAt: '', Entries: 0,
  });

  const auth = authServices.useAuth();

  const url = env.backendAPI('auth/profile');

  useEffect(() => {
    auth.getResource(url)
      .then((response) => {
        if (response) {
          setProfile(response.data);
        }
      }).catch((err) => { throw err; });
  }, [auth, url]);

  return (
    <>
      <ProfileView
        fullName={profile.fullName}
        email={profile.email}
        username={profile.username}
        createdAt={profile.createdAt}
        updatedAt={profile.updatedAt}
        entries={profile.Entries.length}
      />
    </>
  );
}
