import { Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import "./App.less";

import Page from "./containers/Page";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/page" element={<Page />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
