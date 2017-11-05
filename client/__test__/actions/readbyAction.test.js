import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { updateReadBy } from '../../actions/messageActions';
import mockData from '../../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Message Readby Action', () => {
  const { action } = mockData;
  it('should dispatch no action', (done) => {
    moxios.stubRequest('/api/v1/message/readby', {
      status: 200,
      response: {}
    });
    const store = mockStore({});
    const expectedActions = action.emptyAction;

    store.dispatch(updateReadBy()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});
