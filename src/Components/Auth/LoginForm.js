import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Form, Icon, Input, Button, Checkbox, Card } from "antd";
import { Link } from 'react-router-dom';
import { validationRules } from './validation';

const FormItem = Form.Item;



class NormalLoginForm extends PureComponent {

  static propTypes = {
    form: PropTypes.shape({
       validateFields : PropTypes.func
    }),
    login: PropTypes.func,
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      form: { validateFields },
      login
    } = this.props;
    validateFields((err, { email, password, remember }) => {
      if (!err) {
        login({ variables: { email, password } });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator }
    } = this.props;

    return (
      <Card className="login-form" title="Login">
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator("email", { rules: validationRules.email })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Email"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", { rules: validationRules.password })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </FormItem>
          <Link to="/signup">Register now</Link>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(NormalLoginForm);