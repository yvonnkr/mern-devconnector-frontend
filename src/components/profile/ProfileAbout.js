import React, { Fragment } from 'react';

const ProfileAbout = ({ profile }) => {
  const {
    bio,
    skills,
    user: { name }
  } = profile;

  return (
    <div className='profile-about bg-light p-2'>
      {bio && (
        <Fragment>
          <h2 className='text-primary'>{name.trim().split(' ')[0]}'s Bio</h2>
          <p>{bio}</p>
        </Fragment>
      )}

      <div className='line' />
      <h2 className='text-primary'>Skill Set</h2>
      <div className='skills'>
        {skills.map((skill, index) => (
          <div className='p-1' key={index}>
            <i className='fa fa-check' />
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileAbout;
