import logo from './logo.svg';
import './App.css';
import Home from './views/home';
import { Container, Col, Row } from 'react-bootstrap';

function App() {
  return (
    <Container className={"App"} id="container">
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <p>Hello electron</p>
          <Home />
        </header>
      </div>
    </Container>

  );
}

export default App;
