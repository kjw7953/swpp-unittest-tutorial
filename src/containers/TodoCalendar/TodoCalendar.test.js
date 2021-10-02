import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from '../../store/store';
import { Switch, Route } from 'react-router-dom';
import TodoCalendar from './TodoCalendar';
import { getMockStore } from '../../test-utils/mocks';
import * as actionCreators from '../../store/actions/todo';
import axios from 'axios';

const stubInitialState = {
  todos: [
    {
      id: 1,
      title: 'title 1',
      year: 2021,
      month: 10,
      date: 1,
      done: true,
    },
    {
      id: 2,
      title: 'title 2',
      year: 2021,
      month: 10,
      date: 1,
      done: true,
    },
    {
      id: 3,
      title: 'title 3',
      year: 2021,
      month: 10,
      date: 1,
      done: false,
    },
  ],
  selectedTodo: null,
}

jest.mock("../../components/Calendar/Calendar", () => {
  return jest.fn((props) => {
    return (
      <div className="spyCalendar">
        {props.year}.{props.month}
        <button className="spyToggleButton" onClick={props.clickDone} />
      </div>
    );
  });
});

const mockStore = getMockStore(stubInitialState);

describe('<TodoCalendar />', () => {
  let todoCalendar, spyGetTodos;

  beforeEach(() => {
    todoCalendar = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
        <Switch>
          <Route path='/' exact component={TodoCalendar} />
        </Switch>
        </ConnectedRouter>
      </Provider>
    );

    spyGetTodos = jest
    .spyOn(actionCreators, "getTodos")
    .mockImplementation(() => {
      return (dispatch) => {};
    });
  });

  it('should render <Calendar />', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.spyCalendar');
    expect(wrapper.length).toBe(1);
  });

  it(`should call 'handleClickPrev`, () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('button');
    wrapper.at(0).simulate('click');

    const newTodoCalendarInstace = component.find(TodoCalendar.WrappedComponent).instance();
    expect(newTodoCalendarInstace.state.year).toEqual(2021);
    expect(newTodoCalendarInstace.state.month).toEqual(8);

    for(let i = 0; i < 8; i++) {
      wrapper.at(0).simulate('click');
  }
    expect(newTodoCalendarInstace.state.month).toBe(12);
    expect(newTodoCalendarInstace.state.year).toBe(2020);
  });

  it(`should call 'handleClickNext`, () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('button');
    wrapper.at(1).simulate('click');

    

    const newTodoCalendarInstace = component.find(TodoCalendar.WrappedComponent).instance();
    expect(newTodoCalendarInstace.state.year).toEqual(2021);
    expect(newTodoCalendarInstace.state.month).toEqual(10);

    for(let i = 0; i < 3; i++) {
      wrapper.at(1).simulate('click');
    }
    expect(newTodoCalendarInstace.state.month).toBe(1);
    expect(newTodoCalendarInstace.state.year).toBe(2022);
  });

  it(`should click call 'clickDone'`, () => {
    const spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
      .mockImplementation(id => { return dispatch => {}; });
    const component = mount(todoCalendar);
    const wrapper = component.find('.spyCalendar .spyToggleButton');
    wrapper.simulate('click');
    expect(spyToggleTodo).toBeCalledTimes(1);
  });
});