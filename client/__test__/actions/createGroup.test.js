import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import createGroup from '../../actions/groupActions';
import mockData from '../../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Create Group Action', () => {
  const { action } = mockData;
  it('should dispatch no action creator', (done) => {
    moxios.stubRequest('/api/v1/group', {
      status: 200,
      response: {}
    });
    const store = mockStore({});
    const expectedActions = action.emptyAction;

    store.dispatch(createGroup()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});
