import React from "react";
import { mount } from "enzyme";

import Root from "Root";
import CommentList from "components/CommentList";

let wrapped;

beforeEach(() => {
  const initialState = {
    comments: ["comment 1", "comment 2"]
  };

  wrapped = mount(
    <Root initialState={initialState}>
      <CommentList />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it("creates one LI per comment", () => {
  expect(wrapped.find("li").length).toEqual(2);
});

it("shows the comments with the text foreach comment", () => {
  expect(wrapped.render().text()).toContain("comment 1");
  expect(wrapped.render().text()).toContain("comment 2");
});
