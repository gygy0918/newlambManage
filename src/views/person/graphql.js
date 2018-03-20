import gql from "graphql-tag";

export const AVAILABLE_CURRENCIES_QUERY = gql`
  query availableCurrencies {
    availableCurrencies {
      count
    }
  }
`;
export const RATES_QUERY = gql`
  query rates($currency: String!) {
    rates(currency: $currency) {
      currency
      rates {
        currency
        rate
      }
    }
  }
`;
