import "../css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import NavbarTop from "./Navbar";
import Charts from "./Charts";

function App() {
  return (
    <div className="App" id="MainDashboard">
      {/* <header className="App-header height-20px">
        Chungus
      </header> */}
      <NavbarTop />
      <Charts />
    </div>
  );
}

export default App;
