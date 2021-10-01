import React from 'react';
import Sidebar from './components/Sidebar';
import Todos from './components/Todos';
import Container from './components/Container';

const App = () => {
  return (
    <Container>
      <Sidebar />
      <Todos />
    </Container>
  );
};

export default App;
