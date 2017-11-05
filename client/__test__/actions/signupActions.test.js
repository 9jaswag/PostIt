import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import userSignupRequest from '../../actions/signupActions';
import mockLocalStorage from '../../__mocks__/mockLocalStorage';
import mockData from '../../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
window.localStorage = mockLocalStorage;

describe('Sign up action', () => {
  const { action } = mockData;
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('creates an action SET_CURRENT_USER on successful user sign up',
    (done) => {
      moxios.stubRequest('/api/v1/user/signup', {
        status: 201,
        response: action.signinResponse
      });
      const store = mockStore({});
      const userData = action.userSignupData;
      const expectedAction = action.signupAction;
      store.dispatch(userSignupRequest(userData)).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
      done();
    });
});
