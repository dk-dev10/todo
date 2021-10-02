import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { Button, Checkbox, TextField } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { CREATE_TODO, EDIT_TODO } from '../../redux/types';

import style from './style.module.scss';
import { useLocation } from 'react-router';

const Todo = () => {
  const location = useLocation();

  const [grpId, setGrpId] = useState('');

  const dispatch = useDispatch();
  const todos = useSelector((state) =>
    state.todos.todos.filter((todo) => todo.group === grpId)
  );

  const [value, setVal] = useState('');

  useEffect(() => {
    setGrpId(+location.pathname.split('/todo/')[1]);
  }, [location]);

  function onAdd(e) {
    e.preventDefault();

    const id = Date.now();
    if (!!value) {
      dispatch({
        type: CREATE_TODO,
        payload: { title: value, id, done: false, group: grpId },
      });
      setVal('');
    }
  }

  function onEdit(done, id, title) {
    dispatch({ type: EDIT_TODO, payload: { done, id, title } });
  }

  return (
    <div>
      <Box
        component='form'
        sx={{
          '& > :not(style)': { m: 1, width: '90%' },
          mx: 2,
        }}
        noValidate
        className={style.form}
      >
        <TextField
          id='standard-basic'
          label='Пишите что нибудь ...'
          variant='standard'
          onChange={(e) => setVal(e.target.value)}
          value={value}
          className={style.input}
        />
        <Button
          variant='contained'
          onClick={onAdd}
          disabled={false}
          className={style.btn}
          type='submit'
        >
          Добавить
        </Button>
      </Box>
      <Box sx={{ my: 3, mx: 2 }}>
        {todos.map(({ title, id, done, group }) => (
          <div key={id} className={style.todoItem}>
            <Checkbox onClick={() => onEdit(!done, id, title)} checked={done} />
            <p>{title}</p>
          </div>
        ))}
      </Box>
    </div>
  );
};

export default Todo;
