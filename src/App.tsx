// src/App.tsx
import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import { Toaster } from 'sonner';

const App: React.FC = () => {
  return (
    <>
      {useRoutes(routes)}
      <Toaster />
    </>
  );
};

export default App;