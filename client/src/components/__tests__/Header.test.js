import React from 'react';
import { Router } from 'react-router-dom';
import { mount } from 'enzyme';
import history from '../../history';
import Root from '../../Root';
import Header from '../Header';

it('has a Home link, a Sign Up link and a Sign In link', () => {
  const wrapped = mount(
    <Root>
      <Router history={history}>
        <Header />
      </Router>
    </Root>
  );

  expect(wrapped.find('a[href="/"]').length).toEqual(1);
  expect(wrapped.find('a[href="/signup"]').length).toEqual(1);
  expect(wrapped.find('a[href="/signin"]').length).toEqual(1);

  wrapped.unmount();
});

it('shows Projects and Sign Out links when logged in', () => {
  const initialState = {
    auth: { authenticated: true }
  };

  const wrapped = mount(
    <Root initialState={initialState}>
      <Router history={history}>
        <Header />
      </Router>
    </Root>
  );

  expect(wrapped.find('a[href="/"]').length).toEqual(1);
  expect(wrapped.find('a[href="/signup"]').length).toEqual(0);
  expect(wrapped.find('a[href="/signin"]').length).toEqual(0);
  expect(wrapped.find('a[href="/projects/list"]').length).toEqual(1);
  expect(wrapped.find('a[href="/signout"]').length).toEqual(1);

  wrapped.unmount();
});
