import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  TextField,
} from '@material-ui/core';
import { Box } from '@mui/system';
import DeleteIcon from '@material-ui/icons/Delete';
import { CREATE_GROUP, REMOVE_GROUP } from '../../redux/types';

import style from './style.module.scss';

const Sidebar = () => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups.groups);

  const [value, setVal] = useState('');

  function onAdd() {
    if (!!value) {
      dispatch({
        type: CREATE_GROUP,
        payload: { title: value, id: Date.now() },
      });
      setVal('');
    }
  }

  function onRemove(id) {
    dispatch({ type: REMOVE_GROUP, payload: id });
  }

  return (
    <Box sx={{ width: 1 / 4, height: '100vh', bgcolor: '#363d4e' }}>
      <Box sx={{ my: 3, mx: 2 }}>
        <h2>Группы </h2>
      </Box>
      <Divider />
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {!groups.length ? (
          <Box sx={{ my: 3, mx: 2 }}>
            <h3 className={style.empty}>Пусто</h3>
          </Box>
        ) : (
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          >
            {groups.map((gr) => (
              <ListItem style={style.listItem} key={gr.id}>
                <Link className={style.listItemLink} to={`/${gr.id}`}>
                  {gr.title}
                  <IconButton onClick={() => onRemove(gr.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Link>
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      <Box
        component='form'
        sx={{
          '& > :not(style)': { m: 1, width: '90%' },
        }}
        noValidate
      >
        <TextField
          id='standard-basic'
          label='Название группы'
          variant='standard'
          onChange={(e) => setVal(e.target.value)}
          value={value}
          className={style.input}
        />
        <Button
          variant='contained'
          onClick={onAdd}
          disabled={!value}
          className={style.btn}
          type='submit'
        >
          Добавить
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
