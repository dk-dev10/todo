import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';

const Modal = ({ active, getRes, title, remove }) => {
  const [val, setVal] = useState(title);

  const dlgTtl = remove
    ? `Вы действительно хотите удалить группу ${title}?`
    : 'Переименовать';
  const dlgCntnt = !remove ? (
    <DialogContent>
      <TextField
        autoFocus
        margin='dense'
        id='name'
        label='Email Address'
        type='email'
        fullWidth
        variant='standard'
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
    </DialogContent>
  ) : null;

  return (
    <div>
      <Dialog open={active} onClose={() => getRes(false)}>
        <DialogTitle>{dlgTtl}</DialogTitle>
        {dlgCntnt}
        <DialogActions>
          <Button onClick={() => getRes(false, title, remove)}>Отменить</Button>
          <Button
            onClick={() => (!!title ? getRes(true, val, remove) : getRes)}
          >
            {remove ? 'Удалить' : 'Изменить'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
