import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import gql from "graphql-tag";
import Spinner from 'react-spinkit';
import Router from "./Router";
import apolloClient from './ApolloClient'

import "./assets/App.css";


const GET_USER = gql`
  {
    getUser {
      name,
      id
    }
  }
`;

class App extends Component {
  state = {
    auth: false,
    name: "",
    id: "",
    loading: true
  };

  async componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const { data: {getUser: {name, id}}} = await apolloClient.query({
          query: GET_USER
        });
        this.setState({
          auth: true,
          name,
          id,          
          loading: false
        });
      } catch (e) {
        console.log("something went wrong on backend", e);
        this.setState({ auth: false, loading: false });
      }
    } else {
      this.setState({ auth: false, loading: false });
    }
  }

  handleLogout = () => {
    localStorage.removeItem("token");
    this.setState({ auth: false });
  };

  handleAuth = type => ({
    [type]: {
      token,
      user: { name, id }
    }
  }) => {
    this.setState({ token, name, id, auth: true });
    localStorage.setItem("token", token);
  };

  render() {
    if (this.state.loading) {
      return <Spinner name='ball-spin-fade-loader' color="rgb(54, 215, 183)"/>;
    }
    return (
      <ApolloProvider client={apolloClient}>
        <Router 
          {...this.state}
          handleLogout={this.handleLogout}
          handleAuth={this.handleAuth}
        />
      </ApolloProvider>
    );
  }
}

export default App;
