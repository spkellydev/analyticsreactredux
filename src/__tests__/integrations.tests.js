import React from "react";
import { mount } from "enzyme";
import moxios from "moxios";

import Root from "Root";
import App from "components/App";

beforeEach(() => {
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
      <App />
    </Root>
  );

  // find the 'fetchComments' button and click it
  wrapped.find(".fetch-comments").simulate("click");
  moxios.wait(function() {
    // expect to find a list of comments
    expect(wrapped.find("li").length).toEqual(2);
  });

  done();
});
