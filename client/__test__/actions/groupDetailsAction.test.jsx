import expect from 'expect';
import thunk from 'redux-thunk';
import { SET_GROUP_DETAILS } from '../../actions/types';
import configureMockStore from 'redux-mock-store';
import { setGroupDetail, setGroupToStore } from '../../actions/groupActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('set group id action creator', () => {
  it('should contain setGroupDetail object', () => {
    expect(setGroupDetail()).toBeA('object');
  });
  it('should create an action to to set group ID', () => {
    const store = mockStore({});
    const groupId = 5;
    const expectedAction = [{
      type: SET_GROUP_DETAILS,
      groupDetails: groupId
    }];
    store.dispatch(setGroupToStore(groupId));
    expect(store.getActions()).toEqual(expectedAction);
  });
  it('should contain setGroupToStore function', () => {
    expect(setGroupToStore()).toBeA('function');
  });
});
