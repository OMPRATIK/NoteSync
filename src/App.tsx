import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";

import Document from "./pages/Document";
import ThemeProvider from "./components/Themes/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/document/:id" element={<Document />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
