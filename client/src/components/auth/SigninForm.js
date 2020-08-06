import React from 'react';
import { Field, reduxForm } from 'redux-form';

const renderError = ({ error, touched }) => {
  if (touched && error) {
    return (
      <div className="ui error message">
        <div className="header">{error}</div>
      </div>
    );
  }
};

const renderInput = ({ input, label, type, meta }) => {
  const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
  return (
    <div className={className}>
      <label>{label}</label>
      <input {...input} type={type} autoComplete="off" />
      {renderError(meta)}
    </div>
  );
};

const validate = formValues => {
  const errors = {};
  const { email, password } = formValues;
  const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  if (!email) {
    errors.email = 'You must enter an email!';
  }

  if (email && !EMAIL_REGEX.test(email)) {
    errors.email = 'Invalid email!';
  }

  if (!password) {
    errors.password = 'You must enter a password!';
  }

  return errors;
};

const SigninForm = props => {
  const onSubmit = formValues => {
    props.onSubmit(formValues);
  };

  return (
    <form onSubmit={props.handleSubmit(onSubmit)} className="ui form error">
      <Field
        name="email"
        component={renderInput}
        type="text"
        label="Enter email"
      />
      <Field
        name="password"
        component={renderInput}
        type="password"
        label="Password"
      />
      <button className="ui button primary">Submit</button>
    </form>
  );
};

export default reduxForm({
  form: 'signinForm',
  validate
})(SigninForm);
