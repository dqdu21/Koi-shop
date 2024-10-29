import AppRouter from './AppRouter';
import { AuthProvider } from './routes/AuthContext';


const App = () => {
  return (
    <>
      <AuthProvider>
      <AppRouter />
    </AuthProvider>
    </>
  );
};

export default App;
