import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { postMessage } from '../../actions/messageActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Post message Action', () => {
  it('should contain postMessage function', () => {
    expect(postMessage()).toBeA('function');
  });
  it('should dispatch no action', (done) => {
    moxios.stubRequest('/api/v1/group/2/message', {
      status: 201,
      response: {}
    });
    done();
    const store = mockStore({});
    const expectedActions = [];

    store.dispatch(postMessage()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
