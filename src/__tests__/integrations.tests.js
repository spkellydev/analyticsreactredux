import React from "react";
import { mount } from "enzyme";
import moxios from "moxios";

import Root from "Root";
import CommentList from "components/CommentList";
import CommentBox from "components/CommentBox";
let initialState;
beforeEach(() => {
  initialState = {
    auth: true
  };

  moxios.install();
  moxios.stubRequest("http://jsonplaceholder.typicode.com/comments", {
    status: 200,
    response: [
      {
        name: "fetch 1"
      },
      {
        name: "fetch 2"
      }
    ]
  });
});

afterEach(() => {
  moxios.uninstall();
});

it("can fetch a list of commets and display them", done => {
  // attempt to render the entire app
  const wrapped = mount(
    <Root>
      <CommentList />
    </Root>
  );
  const commentBox = mount(
    <Root initialState={initialState}>
      <CommentBox />
    </Root>
  );

  // find the 'fetchComments' button and click it
  commentBox.find(".fetch-comments").simulate("click");
  moxios.wait(function() {
    wrapped.update();
    // expect to find a list of comments
    expect(wrapped.find("li").length).toEqual(2);
  });

  done();
  wrapped.unmount();
  commentBox.unmount();
});
