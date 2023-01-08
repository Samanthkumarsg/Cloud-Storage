import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Upload from './components/upload/Upload';
import axios from 'axios';
import ListFiles from './components/ListFiles';

axios.defaults.baseURL = 'http://localhost:3002/'

function App() {
  return (
    <div className="App">
      <Header />
      <Upload />
      <ListFiles />

    </div>
  );
}

export default App;
