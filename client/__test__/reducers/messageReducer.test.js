import message from '../../reducers/message';
import mockData from '../../__mocks__/mockData';

describe('message reducer', () => {
  const { reducer } = mockData;
  const initialState = reducer.emptyInitialState;
  it('should return an initial state', () => {
    expect(message(undefined, {})).toEqual(initialState);
  });
  it('should handle PASS_MESSAGE:', () => {
    const action = reducer.passMessage;
    const expectedAction = reducer.passMessageAction;
    expect(message(initialState, action)).toEqual(expectedAction);
  });
  it('should handle SET_MESSAGE:', () => {
    const action = reducer.setMessage;
    const expectedAction = reducer.setMessageAction;
    expect(
      message(initialState, action)
    ).toEqual(expectedAction);
  });
});
