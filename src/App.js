import './static/index.css';
import 'antd/dist/antd.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Layout from './layout/layout';

function App() {
  return (
    <div>
      <Router>
        <Layout />
      </Router>
    </div>
  );
}

export default App;
