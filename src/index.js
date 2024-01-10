import React from "react";
import * as ReactDOM from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { setContext } from "@apollo/client/link/context";
import App from "./App";
import "./styles.css";
import "./index.css";
import { AuthProvider } from "./Auth/AuthContext";
import AuthContainer from "./Auth/AuthContainer";

const httpLink = createHttpLink({
  uri: "https://astralaura.ddev.site:5530/api",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("authToken");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <ApolloProvider client={client}>
      <AuthContainer />
    </ApolloProvider>
  </Router>
);
