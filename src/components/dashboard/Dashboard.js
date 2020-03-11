import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentProfile } from './../../actions/profile';

const Dashboard = () => {
  const { auth, profile } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
