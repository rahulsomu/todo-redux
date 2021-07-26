import React from 'react';
import styled from 'styled-components';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import { deleteTask, findTask } from '../src/features/TaskSlice';
import { useDispatch } from 'react-redux';

function Task({ id, item }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask(id));
  };
  const handleFind = () => {
    dispatch(findTask(id));
  };

  return (
    <TaskContainer>
      <TaskName>{item}</TaskName>
      <FunctionButton>
        <IconButton>
          <EditIcon onClick={handleFind} style={{ color: 'white' }} />
        </IconButton>
        <IconButton>
          <DeleteIcon onClick={handleDelete} style={{ color: '#222' }} />
        </IconButton>
      </FunctionButton>
    </TaskContainer>
  );
}

export default Task;

const TaskContainer = styled.div`
  background-color: #6061f6;
  margin-bottom: 10px;
  border-radius: 5px;
  padding: 1rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TaskName = styled.p`
  flex: 0.8;
`;
const FunctionButton = styled.div`
  flex: 0.2;
  justify-content: space-around;
  display: flex;
  padding-left: 20px;
`;
