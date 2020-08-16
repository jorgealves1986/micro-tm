import React from 'react';
import { Router, Route } from 'react-router-dom';
import { mount } from 'enzyme';
import history from '../history';
import { wait } from '../setupTests';
import Root from '../Root';
import App from '../components/App';

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

it('signs up successfully and goes to project list', async () => {
  wrapped.find('a[href="/signup"]').simulate('click', { button: 0 });
  wrapped.update();

  wrapped
    .find('input[name="email"]')
    .simulate('change', { target: { value: 'test@test.com' } });
  wrapped
    .find('input[name="password"]')
    .simulate('change', { target: { value: 'qwerty' } });
  wrapped
    .find('input[name="repeatpassword"]')
    .simulate('change', { target: { value: 'qwerty' } });

  wrapped.find('form').simulate('submit');

  await wait(wrapped, w => {
    return w.find('h2').at(0).exists();
  });

  expect(wrapped.find('h2').length).toEqual(1);
  expect(wrapped.find('h2').text()).toEqual('Projects');
});
