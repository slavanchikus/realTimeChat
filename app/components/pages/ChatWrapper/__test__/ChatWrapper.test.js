import React from 'react';
import { mount, configure } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import ChatWrapper from '../ChatWrapper';

configure({ adapter: new Adapter() });

describe('ChatWrapper', () => {
  let props;
  const chatWrapper = newProps => (
    <ChatWrapper {...newProps} />
  );

  describe('when requred props are defined for reply ChatWrapper', () => {
    beforeEach(() => {
      props = {
        user: {
          lastViewedMessage: 1519307926006,
          userId: '5a698c38eeaed821644cfb96',
          username: 'admin'
        },
        messages: [
          '26 марта',
          {
            _id: '5ab8f0559cb87d32f0e5205b',
            content: '17',
            date: '16:06',
            userId: '5a698c38eeaed821644cfb96',
            username: 'admin'
          }
        ],
        selectedRoom: {
          _id: '5ab613f11a9c4a57a48233a1',
          backgroundSrc: 'https://2ch.hk/b/src/173280275/15221806039983.jpg',
          description: '----------------',
          isPrivate: false,
          participants: {
            admin: {
              color: 'a10009'
            }
          },
          roomName: 'test',
          userId: '5a66ea7ba831d74870af4885'
        },
        onCreateMessage: jest.fn(),
        onGetMessages: jest.fn(),
        onGetOneMessage: jest.fn(),
        onSetRoomBackground: jest.fn(),
        onChangeRoomBackground: jest.fn(),
        onResetRoom: jest.fn(),
        onOpenRoom: jest.fn()
      };
    });

    it('renders correctly', () => {
      const wrapper = mount(chatWrapper(props));
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('check logic on unselected room with correct path in history url', () => {
      props.selectedRoom._id = null;
      const wrapper = mount(
        <MemoryRouter initialEntries={['/#/room/5ab613f11a9c4a57a48233a1']}>
          {chatWrapper(props)}
        </MemoryRouter>
      );
      expect(props.onOpenRoom).toHaveBeenCalledTimes(1);
    });

    it('reset room when component is unmounting', () => {
      const wrapper = mount(chatWrapper(props));
      wrapper.unmount();
      expect(props.onResetRoom).toHaveBeenCalledTimes(1);
    });
  });
});
