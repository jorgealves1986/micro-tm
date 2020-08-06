import React from 'react';
import { mount } from 'enzyme';
import Root from '../../../Root';
import Signin from '../Signin';
import SigninForm from '../SigninForm';

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <Signin />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it('has an instance of SigninForm', () => {
  expect(wrapped.find(SigninForm).length).toEqual(1);
});
