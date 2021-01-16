const fetch = require("node-fetch");

const CurrencyFilter = (userInputRates, rates) => {
  let RatesArray = userInputRates.split(",");
  let exchangeData = {};
  RatesArray.map((item) => {
    exchangeData = {
      ...exchangeData,
      [item]: rates[item] || "no exchange rate",
    };
  });

  return exchangeData;
};

const RateCurrency = (req, res) => {
  //check for query paramters
  if (Object.entries(req.query).length === 0) {
    res.status(404).send({ error: "Please include a base and currency to send for exchange" });
  }
  //check for base in parameters
  else if (!Object.keys(req.query).includes("base")) {
    res.status(404).send({ error: "Base Rate must be present" });
  }
  //check query for currencies
  else if (!Object.keys(req.query).includes("currency")) {
    res.status(404).send({ error: "Currency or Currencies to be exchanged with must be present" });
  } else {
    const { base } = req.query;
    //use base currency to make request to the server
    fetch(`https://api.exchangeratesapi.io/latest?base=${base}`)
      .then((response) => response.json())
      .then((data) => {
        const { base, date, error, rates } = data;
        let filteredRates = !error && CurrencyFilter(req.query.currency, rates);

        let dataToSend = {
          base,
          date,
          error,
          rates: filteredRates,
        };
        res.status(200).send({
          results: {
            data: dataToSend,
          },
        });
      })
      .catch((error) => {
        res.status(400).send({ error: error.message });
      });
  }
};

module.exports = RateCurrency;
