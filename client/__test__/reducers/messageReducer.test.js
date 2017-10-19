/* global expect */
import message from '../../reducers/message';
import * as types from '../../actions/types';

describe('group detail reducer', () => {
  const initialState = {};
  it('should return an initial state', () => {
    expect(message(undefined, {})).toEqual(initialState);
  });
  it('should handle PASS_MESSAGE:', () => {
    const action = {
      type: types.PASS_MESSAGE,
      data: {
        title: 'The End',
        message: 'this is the end'
      }
    };
    const expectedAction = {
      message: {
        title: 'The End',
        message: 'this is the end'
      }
    };
    expect(
      message(initialState, action)
    ).toEqual(expectedAction);
  });
  it('should handle SET_MESSAGE:', () => {
    const action = {
      type: types.SET_MESSAGE,
      messages: {
        title: 'The End',
        message: 'this is the end'
      }
    };
    const expectedAction = {
      groupMessages: {
        title: 'The End',
        message: 'this is the end'
      }
    };
    expect(
      message(initialState, action)
    ).toEqual(expectedAction);
  });
});
