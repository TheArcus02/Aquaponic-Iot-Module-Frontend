import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/not-found';
import ModuleList from './pages/module-list';
import ModuleDetails from './pages/module-details';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<ModuleList />} />
        <Route path='/module/:id' element={<ModuleDetails />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
