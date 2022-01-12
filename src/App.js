import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthContextProvider from './context-stores/AuthContext';
import RoutesComponent from './RoutesComponent';

function App() {

  return (
    <div className="App">
      <Router>
        <AuthContextProvider>
          <RoutesComponent />
        </AuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
