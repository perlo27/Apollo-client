import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Button } from "antd";

import { GET_FEED } from "./Feed";

const VOTE = gql`
  mutation vote($linkId: ID!) {
    vote(linkId: $linkId) {
      id
    }
  }
`;

const VoteButton = ({ linkId, count, disabled }) => (
  <Mutation
    mutation={VOTE}
    update={(cache, resp) => {
      console.log("cache", cache, resp);
    }}
    refetchQueries={() => [
      {
        query: GET_FEED
      }
    ]}
    variables={{ linkId }}
  >
    {vote => (
      <span>
        <Button
          disabled={disabled}
          onClick={() => vote()}
          icon="like"
          style={{ marginRight: 8 }}
        />
        {count}
      </span>
    )}
  </Mutation>
);

VoteButton.propTypes = {
  linkId: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired
}

export default VoteButton;