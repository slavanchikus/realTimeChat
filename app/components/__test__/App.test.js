import React from 'react';
import { Provider } from 'react-redux';

import { mount, configure } from 'enzyme';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import App from '../App';
import Authentication from '../pages/Authentication/Authentication';
import ChatWrapper from '../pages/ChatWrapper/ChatWrapper';
import RoomSelector from '../pages/RoomSelector/RoomSelector';

configure({ adapter: new Adapter() });

describe('App', () => {
  const initialState = {
    user: {
      userId: '5a66ea7ba831d74870af4885',
      username: 'test',
      lastViewedMessage: 1519307926006
    },
    rooms: {
      allRooms: [{
        _id: '5abba5f56243f5939c7b17b5',
        roomName: '123',
        description: '123',
        participants: [],
        backgroundSrc: '',
        userId: '5a66ea7ba831d74870af4885',
        isPrivate: true
      }],
      selectedRoom: {}
    },
    messages: [],
    uiState: {
      isFetching: false
    },
    errors: {}
  };
  const mockStore = configureStore();
  const appWrapper = (store, route) => (
    <Provider store={store} >
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    </Provider>
  );
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  describe('when requred props are defined for reply App', () => {
    it('renders correctly', () => {
      const wrapper = mount(appWrapper(store, '/'));
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    describe('check pages visibility', () => {
      it('show RoomSelector if user are storaged', () => {
        const wrapper = mount(appWrapper(store, '/'));
        expect(wrapper.find(Authentication)).toHaveLength(0);
        expect(wrapper.find(ChatWrapper)).toHaveLength(0);
        expect(wrapper.find(RoomSelector)).toHaveLength(1);
      });

      it('show ChatWrapper if room is selected', () => {
        const wrapper = mount(appWrapper(store, '/room'));
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find(ChatWrapper)).toHaveLength(1);
        expect(wrapper.find(Authentication)).toHaveLength(0);
        expect(wrapper.find(RoomSelector)).toHaveLength(0);
      });
    });
  });
});
