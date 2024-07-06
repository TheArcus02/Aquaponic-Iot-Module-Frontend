import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/not-found';
import ModuleList from './pages/module-list';
import ModuleDetails from './pages/module-details';
import { Toaster } from 'sonner';

const App = () => {
  return (
    <div>
      <img src='/luna_logo.png' alt='logo' className='mx-auto py-10' />

      <main>
        <Routes>
          <Route path='/' element={<ModuleList />} />
          <Route path='/modules/:id' element={<ModuleDetails />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Toaster richColors />

      <footer></footer>
    </div>
  );
};

export default App;
