import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import NavbarTop from './Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="mapView" render={() => {window.location.href="geo_dashboard/src/openlayers_app/index.html"}}/>
      </Routes>
    </BrowserRouter>
    <div className="App" id='MainDashboard'>
      {/* <header className="App-header height-20px">
        Chungus
      </header> */}
      <NavbarTop/>
      {/* <MapView/> */}
      {/* <div className='test'>
        <Badge as="Button" className='btn-primary btn-md'>WOW YAAR</Badge>
      </div> */}
    </div>
    </>
  );
}

export default App;
