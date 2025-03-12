import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Document from "./pages/Document";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/document/:id" element={<Document />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
