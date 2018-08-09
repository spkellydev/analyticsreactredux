import React from "react";
import { mount } from "enzyme";
import App from "components/App";
import CommentBox from "components/CommentBox";

let wrapped;

beforeEach(() => {
  wrapped = mount(<CommentBox />);
});

afterEach(() => {
  wrapped.unmount();
});

it("has a textarea and a button", () => {
  expect(wrapped.find("textarea").length).toEqual(1);
  expect(wrapped.find("button").length).toEqual(1);
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
