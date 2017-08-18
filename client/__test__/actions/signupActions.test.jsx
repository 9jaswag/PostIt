// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import nock from 'nock';
// import { mount, shallow } from 'enzyme';
// import userSignupRequest from '../../actions/signupActions';
// import { SET_CURRENT_USER } from '../../actions/types';

// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);

// describe('Sign up a user', () => {
//   afterEach(() => {
//     nock.cleanAll();
//   });

//   it('it does something', () => {
//     const userData = {
//       username: 'chukss',
//       email: 'chuks.opia@andela.comm',
//       password: 'chukspass',
//       phone: '2347033130440'
//     };
//     nock('http://localhost:9000/')
//       .post('/api/user/signup', userData)
//       .reply(201, { body: {
//         success: true,
//         message: 'Sign up succesful.',
//         data: {
//           token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsInVzZXJFbWFpbCI6ImNodWtzLm9waWFAYW5kZWxhLmNvbW0iLCJ1c2VyVXNlcm5hbWUiOiJjaHVrc3MiLCJ1c2VyUGhvbmUiOiIyMzQ3MDMzMTMwNDQwIiwiaWF0IjoxNTAzMDc1MDgwLCJleHAiOjE1MDMxNjE0ODB9.0SX6NVMqqQpgdUebW3iRBJz8oerTtfzYUm4ADESM7fk'
//         }
//       } });
//     const expectedActions = [
//       { type: SET_CURRENT_USER },
//     ];
//     const store = mockStore();
//     return store.dispatch(userSignupRequest()).then(() => {
//       // return of async actions
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });
// });
