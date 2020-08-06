import React from 'react';
import { connect } from 'react-redux';
import { signin } from '../../actions';
import SigninForm from './SigninForm';

const Signin = props => {
  const onSubmit = formValues => {
    props.signin(formValues);
  };

  return (
    <div>
      <h3>Signin</h3>
      <SigninForm onSubmit={onSubmit} />
    </div>
  );
};

export default connect(null, { signin })(Signin);
