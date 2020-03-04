import React from "react";
import PropTypes from "prop-types";
import { StyledButton } from "./StyledButton";

const isDisabled = props => {
  if (props.disabled) {
    return true;
  }

  if (props.as === "input" && props.type === "text" && !props.onChange) {
    return true;
  }

  if (!props.to && !props.href && !props.onClick && props.as !== "input") {
    return true;
  }

  return false;
};

const Button = ({
  active,
  children,
  disabled = false,
  size = "medium",
  ...props
}) => (
  <StyledButton
    active={active ? true : undefined}
    disabled={isDisabled(props)}
    {...props}
    size={size}
  >
    {children}
  </StyledButton>
);

Button.propTypes = {
  active: PropTypes.bool,
  as: PropTypes.any,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(["xsmall", "small", "medium", "large", "xlarge"])
};

export default Button;
