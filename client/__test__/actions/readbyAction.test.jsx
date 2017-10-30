import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { updateReadBy } from '../../actions/messageActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Message Readby Action', () => {
  it('should return a function that updates the readby status of a message',
    () => {
      expect(updateReadBy()).toBeA('function');
    });
  it('should dispatch no action', (done) => {
    moxios.stubRequest('/api/v1/message/readby', {
      status: 200,
      response: {}
    });
    const store = mockStore({});
    const expectedActions = [];

    store.dispatch(updateReadBy()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});
