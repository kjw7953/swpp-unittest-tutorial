import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';                                           
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import { history, middlewares } from '../store/store';
import * as actionTypes from '../store/actions/actionTypes';

const getMockTodoReducer = jest.fn(
  initialState => (state=initialState, action) => {
    return state;
  }
);

export const getMockStore = (initialState) => {
  const mockTodoReducer = getMockTodoReducer(initialState);
  const rootReducer = combineReducers({
    td: mockTodoReducer,
  });
  return createStore(rootReducer, applyMiddleware(...middlewares));
}