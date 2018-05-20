import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Form, Input, Tooltip, Icon, Button, Card } from "antd";
import { validationRules } from "./validation";

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

class RegistrationForm extends PureComponent {
  static propTypes = {
    form: PropTypes.shape({
      validateFieldsAndScroll : PropTypes.func,
      getFieldDecorator : PropTypes.func
      
    }),
    signup: PropTypes.func,
  }

  state = {
    confirmDirty: false
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      form: { validateFieldsAndScroll },
      signup
    } = this.props;
    validateFieldsAndScroll((err, { email, password, nickname: name }) => {
      if (!err) {
        signup({ variables: { email, password, name } });
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  handleBack = () => this.props.history.push("/");

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Card title="Sign up" className="signup-form">
        <Form onSubmit={this.handleSubmit} >
          <FormItem {...formItemLayout} label="E-mail">
            {getFieldDecorator("email", { rules: validationRules.email })(
              <Input />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Password">
            {getFieldDecorator("password", {
              rules: [
                ...validationRules.password,
                { validator: this.validateToNextPassword }
              ]
            })(<Input type="password" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Confirm Password">
            {getFieldDecorator("confirm", {
              rules: [
                ...validationRules.confirm,
                { validator: this.compareToFirstPassword }
              ]
            })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                Nickname&nbsp;
                <Tooltip title="What do you want others to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator("nickname", { rules: validationRules.nickname })(
              <Input />
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
            <Button onClick={this.handleBack} style={{ marginLeft: 15}}>
              Back to login
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(RegistrationForm);
