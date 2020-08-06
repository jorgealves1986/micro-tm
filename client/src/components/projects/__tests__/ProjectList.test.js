import React from 'react';
import { Router } from 'react-router-dom';
import { mount } from 'enzyme';
import history from '../../../history';
import Root from '../../../Root';
import ProjectList from '../ProjectList';

it('is empty when state is clean', () => {
  const initialState = {
    auth: { authenticated: true },
    projects: {}
  };

  const wrapped = mount(
    <Root initialState={initialState}>
      <Router history={history}>
        <ProjectList />
      </Router>
    </Root>
  );

  expect(wrapped.find('div.item').length).toEqual(0);

  wrapped.unmount();
});

it('has 2 projects', () => {
  const initialState = {
    auth: { authenticated: true },
    projects: {
      1234: {
        userId: 4321,
        name: 'Proj 1',
        id: 1234
      },
      5678: {
        userId: 8765,
        name: 'Proj 2',
        id: 5678
      }
    }
  };

  const wrapped = mount(
    <Root initialState={initialState}>
      <Router history={history}>
        <ProjectList />
      </Router>
    </Root>
  );

  expect(wrapped.find('div.item').length).toEqual(2);

  wrapped.unmount();
});
