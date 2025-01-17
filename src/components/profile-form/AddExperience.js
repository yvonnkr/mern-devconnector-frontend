import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { addExperience } from './../../actions/profile';

const formInitialInputs = {
  company: '',
  title: '',
  location: '',
  from: '',
  to: '',
  current: false,
  description: ''
};

const AddExperience = ({ history }) => {
  const [formData, setFormData] = useState(formInitialInputs);
  const [toDateDisabled, toggleDisabled] = useState(false);

  const dispatch = useDispatch();

  const { company, title, location, from, to, current, description } = formData;

  const onChangeHandler = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmitHandler = e => {
    e.preventDefault();

    dispatch(addExperience(formData, history));
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Add An Experience</h1>
      <p className='lead'>
        <i className='fas fa-code-branch' /> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={e => onSubmitHandler(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Job Title'
            name='title'
            value={title}
            onChange={e => onChangeHandler(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Company'
            name='company'
            value={company}
            onChange={e => onChangeHandler(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={e => onChangeHandler(e)}
          />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input
            type='date'
            name='from'
            value={from}
            onChange={e => onChangeHandler(e)}
          />
        </div>
        <div className='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              checked={current}
              value={current}
              onChange={e => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
            />{' '}
            Current Job
          </p>
        </div>
        <div className='form-group'>
          <h4>To Date</h4>
          <input
            type='date'
            name='to'
            value={to}
            onChange={e => onChangeHandler(e)}
            disabled={toDateDisabled ? 'disabled' : ''}
          />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Job Description'
            value={description}
            onChange={e => onChangeHandler(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

export default withRouter(AddExperience);
