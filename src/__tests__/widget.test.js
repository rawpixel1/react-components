import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { WidgetTopicGroup, WidgetAddon } from "../index";

describe("widget aka topic group aka addon", () => {
  it("should render topic group", async () => {
    const myFn = jest.fn();
    const { getByText, getByTestId } = render(
      <WidgetTopicGroup
        title="My topics"
        filter_icon="https://placehold.it/40x40"
        type="topic_group"
        onClick={myFn}
        data-testid="topic-group"
      />
    );

    expect(getByTestId("topic-group")).toBeInstanceOf(HTMLButtonElement);
    expect(getByText("My topics")).toBeInTheDocument();

    fireEvent(
      getByText("My topics"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );

    expect(myFn).toHaveBeenCalled();
  });

  it("should render addon", async () => {
    const { getByText, getByTestId } = render(
      <WidgetAddon
        title="Lightroom Presets"
        filter_icon="https://placehold.it/40x40"
        type="add_on"
        href="https://example.com"
        data-testid="add-on"
      />
    );
    expect(getByTestId("add-on")).toBeInstanceOf(HTMLAnchorElement);
    expect(getByText("Lightroom Presets")).toBeInTheDocument();
  });

  it("should render as react-router Link with `to` prop", async () => {
    const { getByTestId } = render(
      <WidgetTopicGroup
        title="My topics"
        filter_icon="https://placehold.it/40x40"
        type="topic_group"
        to="/my-react-route"
        data-testid="my-topics"
      />
    );

    expect(getByTestId("my-topics")).toBeInstanceOf(HTMLAnchorElement);
  });
});