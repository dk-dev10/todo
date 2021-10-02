import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import classnames from 'classnames';

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
import EditIcon from '@material-ui/icons/Edit';
import { CREATE_GROUP, REMOVE_GROUP, RENAME_GROUP } from '../../redux/types';
import Modal from '../Modal';

import style from './style.module.scss';

const cn = classnames.bind(style);

const Sidebar = () => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups.groups);
  const active = useSelector((state) => state.menu);

  const [value, setVal] = useState('');
  const [modal, setModal] = useState(false);
  const [grpTtl, setGrpTtl] = useState('');
  const [grpRmv, setGrpRmv] = useState(false);
  const [rmv, setRmv] = useState(null);
  const [rnm, setRnm] = useState(null);

  const history = useHistory();

  function onAdd() {
    const id = Date.now();
    if (!!value) {
      dispatch({
        type: CREATE_GROUP,
        payload: { title: value, id },
      });
      setVal('');
      history.push(`/todo/${id}`);
    }
  }

  function onRemove(id, title) {
    setGrpTtl(title);
    setGrpRmv(true);
    setModal(true);
    setRmv(id);
  }

  function onRename(id, title) {
    setGrpTtl(title);
    setGrpRmv(false);
    setModal(true);
    setRnm({ id, title });
  }

  function getRes(res, val, remove) {
    setModal(false);

    if (remove) {
      if (res) {
        dispatch({ type: REMOVE_GROUP, payload: rmv });
        if (rmv === +history.location.pathname.split('/')[1]) {
          history.push('/todo/');
        }
      }
    } else {
      if (res) {
        dispatch({ type: RENAME_GROUP, payload: { ...rnm, title: val } });
      }
    }
  }

  return (
    <Box
      sx={{
        width: { md: 2 / 5, sm: 4 / 5 },
        bgcolor: '#363d4e',
      }}
      className={cn(style.sidebar, active ? style.sidebarActive : null)}
    >
      <Box sx={{ my: 3, mx: 2 }}>
        <h2 className='todoAppTitle'>Группы </h2>
        <Divider />
      </Box>
      <Box className={style.list}>
        {!groups.length ? (
          <Box sx={{ my: 3, mx: 2 }}>
            <h3 className={style.empty}>Пусто</h3>
          </Box>
        ) : (
          <List>
            {groups.map((gr) => (
              <ListItem style={style.listItem} key={gr.id}>
                <Link className={style.listItemLink} to={`/todo/${gr.id}`}>
                  {gr.title}
                  <div>
                    <IconButton onClick={() => onRename(gr.id, gr.title)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => onRemove(gr.id, gr.title)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
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
      {modal && (
        <Modal active={modal} getRes={getRes} remove={grpRmv} title={grpTtl} />
      )}
    </Box>
  );
};

export default Sidebar;
