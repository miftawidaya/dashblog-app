// src/App.tsx
import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import { Toaster } from 'sonner';
import ScrollToTop from './components/routes/ScrollToTop';

const App: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      {useRoutes(routes)}
      <Toaster />
    </>
  );
};

export default App;
