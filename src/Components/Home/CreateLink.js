import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Button, Modal, Form, Input } from "antd";
const FormItem = Form.Item;

const POST = gql`
  mutation post($url: String!, $description: String!) {
    post(url: $url, description: $description) {
      id
      url
      description
      votesCount
      votes {
        user {
          id
        }
      }
    }
  }
`;

const CollectionCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Create a new link"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="Url">
              {getFieldDecorator("url", {
                rules: [
                  {
                    required: true,
                    message: "Please input the url of link!"
                  },
                  {
                    type: "url",
                    message: "Please input valid url"
                  }
                ]
              })(<Input />)}
            </FormItem>
            <FormItem label="Description">
              {getFieldDecorator("description", {
                rules: [
                  {
                    required: true,
                    message: "Please add some description"
                  }
                ]
              })(<Input type="textarea" />)}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export default class CollectionsPage extends React.Component {
  state = {
    visible: false
  };
  showModal = () => {
    this.setState({ visible: true });
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };
  handleCreate = post => () => {
    const form = this.formRef.props.form;
    form.validateFields((err, { url, description }) => {
      if (err) {
        return;
      }
      post({ variables: { url, description } });
      form.resetFields();
      this.setState({ visible: false });
    });
  };
  saveFormRef = formRef => {
    this.formRef = formRef;
  };
  render() {
    return (
      <div className="new-link">
        <Button 
          type="primary" 
          onClick={this.showModal}
          icon="plus"
          shape="circle"
          size="large"
        />
        <Mutation mutation={POST}>
          {post => (
            <CollectionCreateForm
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate(post)}
            />
          )}
        </Mutation>
      </div>
    );
  }
}
