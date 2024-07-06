import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/not-found';
import ModuleList from './pages/module-list';
import ModuleDetails from './pages/module-details';
import { Toaster } from 'sonner';
import Footer from './components/footer';

const App = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <img src='/luna_logo.png' alt='logo' className='mx-auto py-10' />

      <main className='flex-1'>
        <Routes>
          <Route path='/' element={<ModuleList />} />
          <Route path='/modules/:id' element={<ModuleDetails />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Toaster richColors />
      <Footer />
    </div>
  );
};

export default App;
