import React from 'react';
import { mount } from 'enzyme';
import Root from '../../../Root';
import ProjectForm from '../ProjectForm';

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <ProjectForm />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it('has a name field', () => {
  expect(wrapped.find('input[name="name"]').length).toEqual(1);
});

it('shows errors when field is empty', () => {
  wrapped.find('input[name="name"]').simulate('focus');
  wrapped.find('input[name="name"]').simulate('blur');
  expect(wrapped.find('div.ui.error.message').length).toEqual(1);
  expect(wrapped.find('div.ui.error.message').text()).toEqual(
    'You must enter a name!'
  );
});

it('does not show error when field is not empty', () => {
  wrapped.find('input[name="name"]').simulate('focus');
  wrapped.find('input[name="name"]').simulate('blur');
  expect(wrapped.find('div.ui.error.message').length).toEqual(1);

  wrapped
    .find('input[name="name"]')
    .simulate('change', { target: { value: 'random name' } });
  wrapped.update();

  expect(wrapped.find('div.ui.error.message').length).toEqual(0);
});
