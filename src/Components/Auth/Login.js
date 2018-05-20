import React, { Component } from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { message } from "antd";
import LoginForm from "./LoginForm";

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
      }
    }
  }
`;

export default class Login extends Component {
  static propTypes = {
    handleAuth: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    })
  };

  onError = ({ graphQLErrors, message: errorMessage }) => {
    if(graphQLErrors.length) {
     message.error(graphQLErrors[0].message);
     return;
    } 
    message.error(errorMessage);
  }
  onCompleted = data => {
    const { handleAuth, history } = this.props;
    handleAuth("login")(data);
    history.push("/");
  };

  render() {
    return (
      <Mutation
        mutation={LOGIN}
        // cache.writeQuery({
        //   query: GET_TODOS,
        //   data: { todos: todos.concat([addTodo]) }
        // });
        // }}
        onError={this.onError}
        onCompleted={this.onCompleted}
      >
        {(login, data) => <LoginForm login={login} data={data} />}
      </Mutation>
    );
  }
}
