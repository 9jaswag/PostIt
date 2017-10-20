import expect from 'expect';
import thunk from 'redux-thunk';
import { SET_GROUP_DETAILS } from '../../actions/types';
import configureMockStore from 'redux-mock-store';
import { setGroupId, setGroupToStore } from '../../actions/groupActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('set group id action creator', () => {
  it('should contain setGroupId object', () => {
    expect(setGroupId()).toBeA('object');
  });
  it('should create an action to to set group ID', () => {
    const store = mockStore({});
    const groupId = 5;
    const expectedAction = [{
      type: SET_GROUP_DETAILS,
      data: groupId
    }];
    store.dispatch(setGroupToStore(groupId));
    expect(store.getActions()).toEqual(expectedAction);
  });
  it('should contain setGroupToStore function', () => {
    expect(setGroupToStore()).toBeA('function');
  });
});
