import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/not-found';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<div>ModuleList</div>} />
        <Route path='/module/:id' element={<div>ModuleDetails</div>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
