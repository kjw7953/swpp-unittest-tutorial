import React from 'react';
import { shallow, mount } from 'enzyme';
import Calendar from './Calendar';
import store from '../../store/store';
import axios from 'axios';
import { Table } from 'semantic-ui-react'


import * as actionCreators from '../../store/actions/todo';

const stubTodos = [
  {
    id: 1,
    title: 'TEST_TITLE1',
    year: 2021,
    month: 9,
    date: 1,
    done: false,
  },
  {
    id: 2,
    title: 'TEST_TITLE2',
    year: 2021,
    month: 9,
    date: 2,
    done: false,
  },
  {
    id: 3,
    title: 'TEST_TITLE3',
    year: 2021,
    month: 9,
    date: 3,
    done: true,
  }
]

describe('<Calendar />', () => {
  it('should render date', () => {
    const component = shallow(<Calendar year={2021} month={9} todos={stubTodos} />);
    const wrapper = component.find('.date');
    expect(wrapper.length).toBe(30);
  });

  it(`'clickDone' should toggle todo`, () => {
    const stubClickDone = jest.fn((id) => {})
    const component = shallow(<Calendar year={2021} month={9} todos={stubTodos} clickDone={stubClickDone} />);
    const wrapper = component.find('.todoTitle');
    expect(wrapper.length).toBe(3);
    wrapper.at(0).simulate('click');
    expect(stubClickDone).toHaveBeenCalledTimes(1);
  });
});