import React from 'react';
import Sidebar from './components/Sidebar';
import Todos from './components/Todos';
import Container from './components/Container';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { MENU_TOGGLE } from './redux/types';

const App = () => {
  const dispatch = useDispatch();
  const active = useSelector((state) => state.menu);

  function onActive() {
    dispatch({ type: MENU_TOGGLE, payload: !active });
  }

  return (
    <Container>
      <button onClick={onActive} className='menuBtn'>
        {!active ? <span>&#9776;</span> : <span>&#10005;</span>}
      </button>
      <Sidebar />
      <Todos />
    </Container>
  );
};

export default App;
