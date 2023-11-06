import {
  Container,
  MenuItem,
  Select,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
// import { tempData } from "../../data/app.data";
import { fetchData } from "../../utils/uitls";

const CandleStick = () => {
  const [company, setCompany] = useState("AAPL");
  const [limitReached, setLimitReached] = useState(false);
  const [rawData, setRawData] = useState({});
  const formattedData = [];
  let count = 0;

  const isDesktop = useMediaQuery("(min-width:600px)");

  for (const date in rawData) {
    if ((isDesktop && count >= 25) || (!isDesktop && count >= 5)) {
      break;
    }

    const entry = rawData[date];
    const open = parseFloat(entry["1. open"]);
    const close = parseFloat(entry["4. close"]);
    const high = parseFloat(entry["2. high"]);
    const low = parseFloat(entry["3. low"]);

    const unFormatteddate = new Date(date);
    const formattedDate = `${unFormatteddate.getDate()}/${unFormatteddate.getMonth()}`;

    formattedData.push([formattedDate, low, open, close, high]);

    count++;
  }
  formattedData.push(["date", "a", "b", "c", "d"]);

  formattedData.reverse();

  const options = {
    legend: "none",
    candlestick: {
      fallingColor: { strokeWidth: 0, fill: "#a52714" }, // red
      risingColor: { strokeWidth: 0, fill: "#0f9d58" }, // green
    },
  };

  const handleChange = (event) => {
    setCompany(event.target.value);
  };

  useEffect(() => {
    fetchData(company).then((data) => {
      setRawData(data["Time Series (Daily)"]);
      if (!data["Time Series (Daily)"]) {
        setLimitReached(true);
      }
    });
  }, [company, isDesktop]);

  return (
    <>
      <Container sx={{ paddingTop: 3 }}>
        <Stack
          sx={{ width: "100%", alignItems: "center", justifyContent: "center" }}
          spacing={4}
          direction="row"
        >
          <Select
            sx={{ width: "60%" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={company}
            placeholder="company"
            onChange={handleChange}
          >
            <MenuItem value="AAPL">Apple</MenuItem>
            <MenuItem value="MSFT">Microsoft</MenuItem>
            <MenuItem value="TSLA">Tesla</MenuItem>
            <MenuItem value="AMZN">Amazon</MenuItem>
            <MenuItem value="META">Meta</MenuItem>
          </Select>
        </Stack>
        <Stack
          sx={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            mt: 4,
          }}
        >
          {limitReached ? (
            <>
              <Typography textAlign="center" variant="h6">
                Daily API Call Limit Is Reached please Get API Key From{" "}
                <a
                  rel="noreferrer"
                  target="_blank"
                  href="https://www.alphavantage.co/support/#api-key"
                >
                  here
                </a>
              </Typography>
              <Typography textAlign="center">
                Change API Key In src/utils/utils.js file
              </Typography>
            </>
          ) : (
            <Chart
              chartType="CandlestickChart"
              width="100%"
              height="80vh"
              data={formattedData}
              options={options}
            />
          )}
        </Stack>
      </Container>
    </>
  );
};

export default CandleStick;
