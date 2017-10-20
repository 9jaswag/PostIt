import expect from 'expect';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import getMessages, { setMessages } from '../../actions/messageActions';
import * as types from '../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Get Messages Action', () => {
  it('should contain getMessages function', () => {
    expect(getMessages()).toBeA('function');
  });
  it('should dispatch an action creator', () => {
    const store = mockStore({});
    const messages = [{
      id: 46,
      title: 'htiw',
      message: 'asjpo',
      priority: 'normal',
      author: 'chuks'
    }];
    const expectedActions = [
      { type: types.SET_MESSAGE, messages }
    ];
    store.dispatch(setMessages(messages));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should dispatch SET_MESSAGE action when called', (done) => {
    moxios.stubRequest('/api/v1/group/1/messages', {
      status: 200,
      response: {
        success: true,
        data: [{
          id: 1,
          title: 'Fancy Title',
          message: 'Awesome content',
          priority: 'normal',
          owner: 'chuks'
        }]
      }
    });
    const store = mockStore({});
    const messages = {
      id: 1,
      title: 'Fancy Title',
      message: 'Awesome content',
      priority: 'normal',
      owner: 'chuks'
    };
    const expectedActions = [
      { type: types.SET_MESSAGE, messages }
    ];
    store.dispatch(getMessages(1)).then((res) => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});
