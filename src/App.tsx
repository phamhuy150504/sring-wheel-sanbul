import "./App.css";

import { Box } from "@mui/material";
import SpinningWheel from "./components/SpinningWheel";
import { useEffect, useState } from "react";
import NotFound from "./components/NotFound";

function App() {
  const [checkUrl, setCheckUrl] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const url = params.get("api");

    if (url === "6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b") {
      setCheckUrl(true);
    } else {
      setCheckUrl(false);
    }
  }, []);
  const colors = ["#c13c3c", "#585858", "#278dcb", "#f9af00"];

  return (
    <Box p={2} textAlign="center">
      {checkUrl ? <SpinningWheel colors={colors} /> : <NotFound />}
    </Box>
  );
}

export default App;
