import React from 'react';
import styled from 'styled-components';
import Task from './Task';

function TaskList({ taskList }) {
  return (
    <Tasklist>
      {taskList === null
        ? ''
        : taskList.map((item) => (
            <Task key={item.id} item={item.input} id={item.id} />
          ))}
    </Tasklist>
  );
}

export default TaskList;

const Tasklist=styled.div`
height:82%;
overflow:scroll;
::-webkit-scrollbar {
  display:none
}
`;
