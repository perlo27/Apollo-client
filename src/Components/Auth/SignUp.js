import React, { Component } from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { message } from "antd";
import SignUpForm from "./SignUpForm";

const SIGN_UP = gql`
  mutation signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
      user {
        id
        name
      }
    }
  }
`;

export default class SignUp extends Component {
  static propTypes = {
    handleAuth: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    })
  };
  handleChange = field => ({ target: { value } }) => this.setState({ [field]: value });

  handleLoginError = ({ graphQLErrors }) =>
    message.error(graphQLErrors[0].message);
  onCompleted = data => {
    const { handleAuth, history } = this.props;
    handleAuth("signup")(data);
    history.push("/");
  };

  render() {
    return (
      <Mutation mutation={SIGN_UP} onCompleted={this.onCompleted}>
        {(signup, data) => <SignUpForm signup={signup} data={data} {...this.props}/>}
      </Mutation>
    );
  }
}
