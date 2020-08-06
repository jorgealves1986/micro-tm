import React from 'react';
import { Router, Route } from 'react-router-dom';
import { mount } from 'enzyme';
import history from '../../history';
import Root from '../../Root';
import App from '../App';
import Header from '../Header';
import Welcome from '../Welcome';

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <Router history={history}>
        <Route path="/" component={App} />
      </Router>
    </Root>
  );
});

it('shows a header', () => {
  expect(wrapped.find(Header).length).toEqual(1);
});

it('shows the welcome message', () => {
  expect(wrapped.find(Welcome).length).toEqual(1);
});
