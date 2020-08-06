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
  const { name } = formValues;

  if (!name) {
    errors.name = 'You must enter a name!';
  }

  return errors;
};

const ProjectForm = props => {
  const onSubmit = formValues => {
    props.onSubmit(formValues);
  };

  return (
    <form onSubmit={props.handleSubmit(onSubmit)} className="ui form error">
      <Field
        name="name"
        component={renderInput}
        type="text"
        label="Project name"
      />
      <button className="ui button primary">Submit</button>
    </form>
  );
};

export default reduxForm({
  form: 'projectForm',
  validate
})(ProjectForm);
