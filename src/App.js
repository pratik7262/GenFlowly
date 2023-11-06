import { Box } from "@mui/material";
import CandleStick from "./components/CandleStick";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Box sx={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
        <Navbar />
        <CandleStick />
      </Box>
    </>
  );
}

export default App;
