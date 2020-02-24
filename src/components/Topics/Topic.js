import React from "react";
import PropTypes from "prop-types";

import { StyledTopicButton } from "./StyledTopic";

const Topic = ({
  id,
  icon,
  title,
  isDAM = false,
  isLoading = false,
  isTagged = false,
  onTopicClick
}) => {
  const handleTopicClick = e => {
    if (typeof onTopicClick === "function") {
      onTopicClick(e, { id });
    }
  };

  return (
    <StyledTopicButton
      onClick={handleTopicClick}
      disabled={isLoading && "disabled"}
      isDAM={isDAM}
      isTagged={isTagged}
      isLoading={isLoading}
      title={title}
      icon={icon}
    />
  );
};

Topic.propTypes = {
  id: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isDAM: PropTypes.bool,
  isLoading: PropTypes.bool,
  isTagged: PropTypes.bool,
  onTopicClick: PropTypes.func
};

export default Topic;