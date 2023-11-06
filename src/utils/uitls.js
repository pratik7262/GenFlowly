const API_KEY = "HEHBEO2H37OXCZ8Z";

export const fetchData = async (company) => {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  };

  let res = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${company}&apikey=${API_KEY}`,
    {
      method: "GET",
      headers: headersList,
    }
  );

  const json = await res.json();

  return json;
};
