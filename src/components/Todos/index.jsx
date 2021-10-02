import React from 'react';
import { Route } from 'react-router';

import { Box } from '@mui/system';
import { Divider } from '@material-ui/core';

import Todo from './todos';

const Todos = () => {
  return (
    <Box sx={{ width: { md: 3 / 5, xs: '100%' } }}>
      <Box sx={{ my: 3, mx: 2 }}>
        <h2 className='todoAppTitle'>Заметки</h2>
      </Box>
      <Divider light={true} />
      <Route path='/todo/:id' exact>
        <Todo />
      </Route>
    </Box>
  );
};

export default Todos;
