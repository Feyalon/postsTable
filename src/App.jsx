import { Routes, Route } from "react-router";
import HomePage from "./pages/Home/Homepage";
function App() {
  return(
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:index" element={<HomePage/>} />
    </Routes>
  )
}

export default App;
