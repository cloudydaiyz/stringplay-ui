import { AppContext } from './context';
import { AppRouter } from './router';

function App() {
  return (
    <AppContext>
      <AppRouter />
    </AppContext>
  );
}

export default App;