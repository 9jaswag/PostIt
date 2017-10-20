import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { removeUser } from '../../actions/groupActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Remove User Action', () => {
  it('should return a function', () => {
    expect(removeUser()).toBeA('function');
  });
  it('should dispatch no action', (done) => {
    moxios.stubRequest('/api/v1/group/1/remove', {
      status: 200,
      response: {}
    });
    const store = mockStore({});
    const expectedActions = [];

    store.dispatch(removeUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});
