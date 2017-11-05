import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { searchUserAction } from '../../actions/groupActions';
import mockData from '../../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Search User Action', () => {
  const { action } = mockData;
  it('should dispatch no action creator', (done) => {
    moxios.stubRequest('/api/v1/user/search', {
      status: 200,
      response: {}
    });
    const payload = action.searchPayload;
    const store = mockStore({});
    const expectedActions = action.emptyAction;

    store.dispatch(searchUserAction(payload)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});
