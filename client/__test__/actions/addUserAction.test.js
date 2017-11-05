import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { addUser, findUser } from '../../actions/groupActions';
import mockData from '../../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const { action } = mockData;

describe('Add User Action', () => {
  it('should dispatch no action creator', (done) => {
    moxios.stubRequest('/api/v1/group/1/user', {
      status: 200,
      response: {}
    });
    const store = mockStore({});
    const expectedActions = action.emptyAction;

    store.dispatch(addUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});

describe('Find User Action', () => {
  it('should dispatch no action creator', (done) => {
    moxios.stubRequest('/api/v1/users', {
      status: 200,
      response: {}
    });
    const store = mockStore({});
    const expectedActions = action.emptyAction;

    store.dispatch(findUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});

