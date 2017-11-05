import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { postMessage } from '../../actions/messageActions';
import mockData from '../../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Post message Action', () => {
  const { action } = mockData;
  it('should dispatch no action', (done) => {
    moxios.stubRequest('/api/v1/group/2/message', {
      status: 201,
      response: {}
    });
    done();
    const store = mockStore({});
    const expectedActions = action.emptyAction;

    store.dispatch(postMessage()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
