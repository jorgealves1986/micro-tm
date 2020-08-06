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
  const { description } = formValues;

  if (!description) {
    errors.description = 'You must enter a description!';
  }

  return errors;
};

const TaskForm = props => {
  const onSubmit = formValues => {
    props.onSubmit(formValues);
  };

  return (
    <form onSubmit={props.handleSubmit(onSubmit)} className="ui form error">
      <Field
        name="description"
        component={renderInput}
        type="text"
        label="Task description"
      />
      <Field
        name="completed"
        component={renderInput}
        type="checkbox"
        label="Completed?"
      />
      <button className="ui button primary">Submit</button>
    </form>
  );
};

export default reduxForm({
  form: 'taskForm',
  validate
})(TaskForm);
