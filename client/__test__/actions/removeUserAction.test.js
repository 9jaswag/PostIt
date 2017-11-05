import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { removeUser } from '../../actions/groupActions';
import mockData from '../../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Remove User Action', () => {
  const { action } = mockData;
  it('should dispatch no action', (done) => {
    moxios.stubRequest('/api/v1/group/1/remove', {
      status: 200,
      response: {}
    });
    const store = mockStore({});
    const expectedActions = action.emptyAction;

    store.dispatch(removeUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});
