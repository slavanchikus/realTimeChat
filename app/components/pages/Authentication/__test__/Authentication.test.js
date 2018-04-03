import React from 'react';
import { mount, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import Authentication from '../Authentication';
import ErrorContainer from '../../../shared/ErrorContainer/ErrorContainer';

configure({ adapter: new Adapter() });

describe('Authentication', () => {
  let props;
  const authenticationWrapper = newProps => (
    <Authentication {...newProps} />
  );

  describe('when requred props are defined for reply Authentication', () => {
    beforeEach(() => {
      props = {
        errors: {},
        onUserRequest: jest.fn(),
        onUserCreate: jest.fn()
      };
    });

    it('renders correctly', () => {
      const wrapper = mount(authenticationWrapper(props));
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('on user error show error container', () => {
      const wrapper = mount(authenticationWrapper(props));
      expect(wrapper.find(ErrorContainer).exists()).toBe(false);
      wrapper.setProps({ errors: { userError: 'user exists' }});
      expect(wrapper.find(ErrorContainer).exists()).toBe(true);
    });

    describe('inputs logic', () => {
      it('send request if inputs are not empty', () => {
        const wrapper = mount(authenticationWrapper(props));
        wrapper.find('div.button').simulate('click');
        expect(props.onUserRequest).toHaveBeenCalledTimes(0);
        wrapper.setState({ username: 'test', password: '123' });
        wrapper.find('div.button').simulate('click');
        expect(props.onUserRequest).toHaveBeenCalledTimes(1);
      });

      it('check inputs content with their sync states', () => {
        const wrapper = mount(authenticationWrapper(props));
        wrapper.setState({ username: 'test', password: '123' });
        expect(wrapper.find('input[type="text"]').props().value === 'test').toBe(true);
        expect(wrapper.find('input[type="password"]').props().value === '123').toBe(true);
      });
    });
  });
});
