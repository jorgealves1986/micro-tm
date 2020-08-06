import React from 'react';
import { connect } from 'react-redux';
import { signup } from '../../actions';
import SignupForm from './SignupForm';

const Signup = props => {
  const onSubmit = formValues => {
    props.signup(formValues);
  };

  return (
    <div>
      <h3>Signup</h3>
      <SignupForm onSubmit={onSubmit} />
    </div>
  );
};

export default connect(null, { signup })(Signup);
