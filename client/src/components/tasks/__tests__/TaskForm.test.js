import React from 'react';
import { mount } from 'enzyme';
import Root from '../../../Root';
import TaskForm from '../TaskForm';

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <TaskForm />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it('has description and completed fields', () => {
  expect(wrapped.find('input[name="description"]').length).toEqual(1);
  expect(wrapped.find('input[name="completed"]').length).toEqual(1);
});

it('shows errors when field description is empty', () => {
  wrapped.find('input[name="description"]').simulate('focus');
  wrapped.find('input[name="description"]').simulate('blur');
  expect(wrapped.find('div.ui.error.message').length).toEqual(1);
  expect(wrapped.find('div.ui.error.message').text()).toEqual(
    'You must enter a description!'
  );
});

it('does not show error when field description is not empty', () => {
  wrapped.find('input[name="description"]').simulate('focus');
  wrapped.find('input[name="description"]').simulate('blur');
  expect(wrapped.find('div.ui.error.message').length).toEqual(1);

  wrapped
    .find('input[name="description"]')
    .simulate('change', { target: { value: 'random description' } });
  wrapped.update();

  expect(wrapped.find('div.ui.error.message').length).toEqual(0);
});
