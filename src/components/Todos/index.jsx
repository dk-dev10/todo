import { Divider } from '@material-ui/core';
import { Box } from '@mui/system';
import React from 'react';

const Todos = () => {
  return (
    <Box sx={{ width: 3 / 4 }}>
      <Box sx={{ my: 3, mx: 2 }}>
        <h2 className='todoAppTitle'>Задачи из группы</h2>
      </Box>
      <Divider light={true} />
    </Box>
  );
};

export default Todos;
