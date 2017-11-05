import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { setGroupToStore } from '../../actions/groupActions';
import mockData from '../../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('set group id action creator', () => {
  const { action } = mockData;
  it('should create an action to to set group ID', () => {
    const store = mockStore({});
    const groupId = action.groupId;
    const expectedAction = action.setGroupDetailAction;
    store.dispatch(setGroupToStore(groupId));
    expect(store.getActions()).toEqual(expectedAction);
  });
});
