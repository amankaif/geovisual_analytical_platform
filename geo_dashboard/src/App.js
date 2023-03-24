import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Badge from 'react-bootstrap/Badge';

import NavbarTop from './components/Navbar';

function App() {
  return (
    <div className="App" id='MainDashboard'>
      {/* <header className="App-header height-20px">
        Chungus
      </header> */}
      <NavbarTop/>
      {/* <div className='test'>
        <Badge as="Button" className='btn-primary btn-md'>WOW YAAR</Badge>
      </div> */}
    </div>
  );
}

export default App;
