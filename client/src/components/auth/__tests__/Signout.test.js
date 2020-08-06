import React from 'react';
import { Router } from 'react-router-dom';
import history from '../../../history';
import { mount } from 'enzyme';
import Root from '../../../Root';
import Signout from '../Signout';
import Modal from '../../Modal';

let wrapped;

// add a div with #modal id to the global body
const modalRoot = global.document.createElement('div');
modalRoot.setAttribute('id', 'modal');
const body = global.document.querySelector('body');
body.appendChild(modalRoot);

beforeEach(() => {
  const initialState = {
    auth: { authenticated: true }
  };

  wrapped = mount(
    <Root initialState={initialState}>
      <Router history={history}>
        <Signout />
      </Router>
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it('has an instance of Modal', () => {
  expect(wrapped.find(Modal).length).toEqual(1);
});
