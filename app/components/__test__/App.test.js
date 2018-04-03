import React from 'react';
import { shallow, configure } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import { MemoryRouter } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import App from '../App';
import Authentication from '../pages/Authentication/Authentication';
import ChatWrapper from '../pages/ChatWrapper/ChatWrapper';
import RoomSelector from '../pages/RoomSelector/RoomSelector';

configure({ adapter: new Adapter() });

describe('App', () => {
  const store = createMockStore({
    user: {
      userId: '5a66ea7ba831d74870af4885',
      username: 'test',
      lastViewedMessage: 1519307926006
    },
    rooms: {
      allRooms: {
        _id: '5abba5f56243f5939c7b17b5',
        roomName: '123',
        description: '123',
        participants: [],
        backgroundSrc: '',
        userId: '5a66ea7ba831d74870af4885',
        isPrivate: true
      },
      selectedRoom: {}
    },
    messages: []
  });
  const context = { store };
  let props;
  const appWrapper = newProps => (
    <App {...newProps} />
  );

  describe('when requred props are defined for reply App', () => {
    beforeEach(() => {
      props = { };
    });

    it('renders correctly', () => {
      const wrapper = shallow(appWrapper(props), { context });
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('show RoomSelector if user are storaged', () => {
      const wrapper = shallow(
        <MemoryRouter initialEntries={['/#']}>
          {appWrapper(props)}
        </MemoryRouter>
      , { context });
      console.log(wrapper);
    });
  });
});
