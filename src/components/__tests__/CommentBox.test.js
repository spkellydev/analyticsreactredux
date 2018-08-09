import React from "react";
import { mount } from "enzyme";
import Root from "Root";
import CommentBox from "components/CommentBox";

let wrapped;
let initialState;

beforeEach(() => {
  initialState = { auth: true };
  wrapped = mount(
    <Root initialState={initialState}>
      <CommentBox />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it("has a textarea and two buttons", () => {
  expect(wrapped.find("textarea").length).toEqual(1);
  expect(wrapped.find("button").length).toEqual(2);
});

describe("textarea", () => {
  beforeEach(() => {
    let textarea = wrapped.find("textarea");

    textarea.simulate("change", {
      target: {
        value: "new comment"
      }
    });

    wrapped.update();
  });

  it("can handle input change in the textarea", () => {
    expect(wrapped.find("textarea").prop("value")).toEqual("new comment");
  });

  it("clears the textarea when submited", () => {
    wrapped.find("form").simulate("submit");
    wrapped.update();

    expect(wrapped.find("textarea").prop("value")).toEqual("");
  });
});
