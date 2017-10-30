import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import createGroup from '../../actions/groupActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Create Group Action', () => {
  it('should contain createGroup function', () => {
    expect(createGroup()).toBeA('function');
  });

  it('should dispatch no action creator', (done) => {
    moxios.stubRequest('/api/v1/group', {
      status: 200,
      response: {}
    });
    const store = mockStore({});
    const expectedActions = [];

    store.dispatch(createGroup()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});
