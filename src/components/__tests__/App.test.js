import React from "react";
import { shallow } from "enzyme";
import Root from "Root";
import App from "components/App";
import CommentList from "components/CommentList";

let wrapped;

beforeEach(() => {
  wrapped = shallow(
    <Root>
      <App />
    </Root>
  );
});

it("shows a comment list", () => {
  expect(wrapped.find(CommentList).length).toEqual(0);
});

afterEach(() => {
  wrapped.unmount();
});
