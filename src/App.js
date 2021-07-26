import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  addTask,
  selectTask,
  selectEditingItem,
  editTask,
} from '../src/features/TaskSlice';
import { v4 as uuidv4 } from 'uuid';
import TaskList from './TaskList';

function App() {
  const [isAble, setIsAble] = React.useState(true);
  const [input, setInput] = React.useState('');
  const taskList = useSelector(selectTask);
  const editTitle = useSelector(selectEditingItem);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!editTitle) {
      setInput('');
    } else {
      setInput(editTitle.title);
    }
  }, [editTitle]);

  React.useEffect(() => {
    localStorage.setItem('tasklist', JSON.stringify(taskList));
  }, [taskList]);

  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
    setIsAble(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const task = {
      input: input,
      id: uuidv4(),
    };

    if (editTitle) {
      const edittedTask = {
        input: input,
        id: editTitle.id,
      };
      dispatch(editTask(edittedTask));
      setInput('');
      setIsAble(true);
    } else {
      dispatch(addTask(task));
      setInput('');
      setIsAble(true);
    }
  };

  return (
    <Container>
      {/* THE BODY */}
      <Wrapper>
        <h1 style={{ color: 'gray', textAlign: 'center',marginBottom:'2rem' }}>TODO APP</h1>
        <TaskList taskList={taskList} />
        <InputWrapper>
          <Input
            onChange={handleChange}
            type='text'
            value={input}
            placeholder='Enter Task'
          />
          <Button disabled={isAble} onClick={handleSubmit}>
            {editTitle ? 'Edit' : 'Submit'}
          </Button>
        </InputWrapper>
      </Wrapper>
    </Container>
  );
}

export default App;
const Container = styled.div`
  height: 100vh;
  max-width:500px;
  background-color: #222;
  padding: 30px;
  margin:0 auto;
`;
const Wrapper = styled.form`
  width: 100%;
  margin: 0 auto;
  position: relative;
  height: 100%;
`;
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #6061f6;
  padding: 5px;
  border-radius: 3px;
  justify-content: space-between;
  bottom: 0;
  position: absolute;
  width: 100%;
`;

const Input = styled.input`
  outline: none;
  border: none;
  border-radius: 3px;
  flex: 1;
  margin-right: 5px;
  height: 35px;
  padding-left: 10px;
`;
const Button = styled.button`
  border: none;
  padding: 10px;
  color: #222;
  
  border-radius: 3px;
  :disabled{
    color:white;
  }
`;
