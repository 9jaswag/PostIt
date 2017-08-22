import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import searchUserAction from '../../actions/searchUserAction';
import * as types from '../../actions/types';
import mockLocalStorage from '../../__mocks__/mockLocalStorage';