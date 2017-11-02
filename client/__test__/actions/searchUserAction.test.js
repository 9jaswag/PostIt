import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { searchUserAction } from '../../actions/groupActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Search User Action', () => {
  it('should contain a searchUserAction function', () => {
    expect(searchUserAction()).toBeA('function');
  });
  it('should dispatch no action creator', (done) => {
    moxios.stubRequest('/api/v1/user/search', {
      status: 200,
      response: {}
    });
    const payload = {
      username: 'chuks',
      offset: 0,
      limit: 2
    };
    const store = mockStore({});
    const expectedActions = [];

    store.dispatch(searchUserAction(payload)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});
