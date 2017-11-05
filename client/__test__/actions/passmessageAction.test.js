import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { passMessage } from '../../actions/messageActions';
import mockData from '../../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});
const { action } = mockData;

describe('Pass message Action', () => {
  it('should dispatch PASS_MESSAGE action', () => {
    store.dispatch(passMessage(action.messageDetails));
    expect(store.getActions()).toEqual(action.passMessageAction);
  });
});
