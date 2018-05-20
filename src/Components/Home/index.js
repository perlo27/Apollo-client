import React, { PureComponent, Fragment } from "react";
import { Button } from "antd";
import Feed from "./Feed";
import CreateLink from "./CreateLink";


export default class Home extends PureComponent {
  render() {
    const { name, handleLogout, userId } = this.props;
    return (
      <Fragment>
        <header className="app-header">
          <div className="header-user-block">
            <span style={{ marginRight: 20 }}>
              Welcome, <b>{name}</b>
            </span>
            <Button type="primary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </header>
        <Feed userId={userId} />
        <CreateLink />
      </Fragment>
    );
  }
}
