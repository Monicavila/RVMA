import React from "react";
import renderer from "react-test-renderer";
import Room from "../components/room/room";

it("renders the Landing snapshot", () => {
    const tree = renderer.create(<Room />).toJSON();
    expect(tree).toMatchSnapshot();
});

"use strict";
// This is a basic test file for use with testling.
// The test script language comes from tape.
/* jshint node: true */
/* global Promise */
const test = require("tape");

const getUserMedia = require("../getusermedia");

test("getUserMedia audio-only", function (t) {
  let constraints = {audio: true, fake: true};
  getUserMedia(constraints, function (err, stream) {
    if (err) {
        t.fail(err.toString());
        return;
    }
    t.pass("got stream");
    t.end();
  });
});

test("getUserMedia video-only", function (t) {
  let constraints = {video: true, fake: true};
  getUserMedia(constraints, function (err, stream) {
    if (err) {
        t.fail(err.toString());
        return;
    }
    t.pass("got stream");
    t.end();
  });
});

test("getUserMedia audio-video", function (t) {
  let constraints = {audio: true, video: true, fake: true};
  getUserMedia(constraints, function (err, stream) {
    if (err) {
        t.fail(err.toString());
        return;
    }
    t.pass("got stream");
    t.end();
  });
});