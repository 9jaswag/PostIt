/* global window */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import { getGroups, getMemberCount } from '../../actions/groupActions';
import mockLocalStorage from '../../__mocks__/mockLocalStorage';
import mockData from '../../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
window.localStorage = mockLocalStorage;

describe('Get groups action', () => {
  const { action } = mockData;
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch SET_USER_GROUPS action', (done) => {
    moxios.stubRequest('/api/v1/user/group', {
      status: 200,
      response: action.getGroupsResponse
    });
    const store = mockStore({});
    const groups = action.groupDetails;
    const expectedActions = action.getGroupAction;
    store.dispatch(getGroups(groups)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
  it('should dispatch SET_MEMBER_COUNT action', (done) => {
    moxios.stubRequest('/api/v1/group/2/count', {
      status: 200,
      response: action.getMemberCountResponse
    });
    const store = mockStore({});
    const count = action.groupMemberCount;
    const expectedActions = action.getMemberCountAction;
    store.dispatch(getMemberCount(count)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});
