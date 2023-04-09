import './App.css';
import Game from './page/game';
import Login from './page/login';
import Setting from './page/setting';
import { Route, BrowserRouter as Router } from 'react-router-dom'  


function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/game" component={Game} />
        <Route exact path="/" component={Game} />
        <Route exact path="/setting" component={Setting} />
      </Router>

    </div>
  );
}

export default App;

