import React from 'react';
import { mount } from 'enzyme';
import Root from '../../../Root';
import SigninForm from '../SigninForm';

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <SigninForm />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it('has email and password fields', () => {
  expect(wrapped.find('input[name="email"]').length).toEqual(1);
  expect(wrapped.find('input[name="password"]').length).toEqual(1);
});

it('shows errors when fields are empty', () => {
  wrapped.find('input[name="email"]').simulate('focus');
  wrapped.find('input[name="email"]').simulate('blur');
  expect(wrapped.find('div.ui.error.message').length).toEqual(1);

  wrapped.find('input[name="password"]').simulate('focus');
  wrapped.find('input[name="password"]').simulate('blur');
  expect(wrapped.find('div.ui.error.message').length).toEqual(2);
});

it('shows invalid email message when an invalid email is provided', () => {
  wrapped.find('input[name="email"]').simulate('focus');
  wrapped.find('input[name="email"]').simulate('blur');
  wrapped
    .find('input[name="email"]')
    .simulate('change', { target: { value: 'rgergerg' } });
  wrapped.update();

  expect(wrapped.find('div.ui.error.message').length).toEqual(1);
  expect(wrapped.find('div.ui.error.message div').text()).toEqual(
    'Invalid email!'
  );
});

it('does not show error when has a valid email', () => {
  wrapped.find('input[name="email"]').simulate('focus');
  wrapped.find('input[name="email"]').simulate('blur');
  wrapped
    .find('input[name="email"]')
    .simulate('change', { target: { value: 'rgergerg@rgre.com' } });
  wrapped.update();

  expect(wrapped.find('div.ui.error.message').length).toEqual(0);
});
