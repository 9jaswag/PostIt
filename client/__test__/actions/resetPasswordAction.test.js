import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import resetPassword from '../../actions/resetPasswordAction';
import mockData from '../../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Reset password Action', () => {
  const { action } = mockData;
  it('should dispatch no action creator', (done) => {
    moxios.stubRequest('/api/v1/user/reset', {
      status: 200,
      response: {}
    });
    const store = mockStore({});
    const expectedActions = action.emptyAction;

    store.dispatch(resetPassword()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});
