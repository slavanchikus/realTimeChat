import React from 'react';
import PropTypes from 'prop-types';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Authentication from '../Authentication';

configure({ adapter: new Adapter() });

describe('Authentication', () => {
  let props;
  const authenticationWrapper = newProps => (
    <Authentication {...newProps} />
  );

  authenticationWrapper.propTypes = {
    errors: PropTypes.object.isRequired,
    onUserRequest: PropTypes.func.isRequired,
    onUserCreate: PropTypes.func.isRequired,
  };

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
    });
  });
});
