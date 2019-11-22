import React from "react";
import {LinkContainer} from 'react-router-bootstrap';
import "./Main.css";
// import blender background image (INSIDE)

export default function Home() {
  return (
    <div className="Main">
      <div className="lander">
        <h1>I AM </h1>
        <div className="miaDiv">
          <LinkContainer to="/mia">
              <button type="button" className="btn btn-primary btn-circle btn-xl">Mia</button>
          </LinkContainer>
        </div>
        {/* <div className="messagesDiv">
          <LinkContainer to='/messages'>
              <button type="button" className="btn btn-primary btn-circle btn-xl">Messages</button>
          </LinkContainer>
        </div> */}
        <div className="moodsDiv">
          <LinkContainer to='/moods' >
              <button type="button" className="btn btn-primary btn-circle btn-xl">Moods</button>
          </LinkContainer>
        </div>
      </div>
    </div>
  );
}