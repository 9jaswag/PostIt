import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import resetPassword from '../../actions/resetPasswordAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Search User Action', () => {
  it('should return a function', () => {
    expect(resetPassword()).toBeA('function');
  });
  it('should dispatch no action creator', (done) => {
    moxios.stubRequest('/api/v1/user/reset', {
      status: 200,
      response: {}
    });
    const store = mockStore({});
    const expectedActions = [];

    store.dispatch(resetPassword()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});
