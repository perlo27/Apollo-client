import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Spinner from 'react-spinkit';
import { List, Card, message } from "antd";
import VoteButton from "./VoteButton";

export const GET_FEED = gql`
  {
    feed {
      count
      links {
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
  }
`;

const Feed = ({ userId }) => (
  <Query query={GET_FEED} pollInterval={500}>
    {({ loading, error, data, client }) => {
      client.writeData({ data: { auth: true } });
      console.log("data", data);
      if (loading) return <Spinner name='ball-spin-fade-loader' color="rgb(54, 215, 183)"/>;;
      if (error) {
        message.error('Failed loading feed');
        return null;
      };

      return (
        <Card className="content">
          <List
            itemLayout="vertical"
            dataSource={data.feed.links}
            renderItem={link => (
              <List.Item
                key={link.id}
                actions={[
                  <VoteButton
                    linkId={link.id}
                    count={link.votesCount}
                    disabled={!!link.votes.find(v => v.user.id === userId)}
                  />
                ]}
              >
                <List.Item.Meta
                  title={link.url}
                  description={link.description}
                />
              </List.Item>
            )}
          />
        </Card>
      );
    }}
  </Query>
);

Feed.propTypes = {
  userId: PropTypes.string.isRequired
};

export default Feed;
