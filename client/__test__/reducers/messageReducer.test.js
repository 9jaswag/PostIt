import expect from 'expect';
import message from '../../reducers/message';
import mockData from '../../__mocks__/mockData';

describe('message reducer', () => {
  const { reducer } = mockData;
  const initialState = reducer.emptyInitialState;
  it('should return an initial state', () => {
    expect(message(undefined, {})).toEqual(initialState);
  });
  it('should handle SET_MESSAGE:', () => {
    const action = reducer.setMessage;
    const expectedAction = reducer.setMessageAction;
    expect(
      message(initialState, action)
    ).toEqual(expectedAction);
  });
  it('should handle UPDATE_GROUP_MESSAGE:', () => {
    const action = reducer.updateMessage;
    const expectedAction = reducer.updateMessageAction;
    expect(
      message(initialState, action)
    ).toEqual(expectedAction);
  });
});
