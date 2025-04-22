import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";

import Document from "./pages/Document";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/document/:id" element={<Document />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
