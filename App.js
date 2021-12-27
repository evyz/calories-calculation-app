import AppRouter from './src/AppRouter';
import AppProvider from './src/store';

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
