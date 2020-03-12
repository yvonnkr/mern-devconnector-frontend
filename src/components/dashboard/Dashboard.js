import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCurrentProfile, deleteAccount } from './../../actions/profile';
import Spinner from './../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = () => {
  const { user } = useSelector(state => state.auth);
  const { profile, loading } = useSelector(state => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  if (loading && profile === null) {
    return <Spinner />;
  }

  return (
    <>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'> Welcome {user && user.name} </i>
      </p>

      {profile !== null ? (
        <>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className='my-2'>
            <button
              className='btn btn-danger'
              onClick={() => dispatch(deleteAccount())}
            >
              <i className='fa fa-user-minus' />
              Delete My Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p>You have not yet set up a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </>
      )}
    </>
  );
};

export default Dashboard;
