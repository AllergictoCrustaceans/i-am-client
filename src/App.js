import React, {useState, useEffect} from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import {Auth} from 'aws-amplify';
import "./App.css";
import Routes from "./Routes";

function App(props) {
  const [isAuthenticating, setIsauthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch(e) {
      if(e !== 'No current user') {
        alert(e);
      }
    }
    setIsauthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    props.history.push('/');
  }

  return (
    !isAuthenticating &&
    <div className="App container">
      <Navbar className = "navbar" fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {
            isAuthenticated
            ? <>
                <Navbar.Brand>
                  <Link to="/main">Main</Link>
                </Navbar.Brand> 
                <Nav pullRight>
                  <NavItem onClick={handleLogout}>Logout</NavItem>
                </Nav> 
              </>
            : <>
                <Navbar.Brand>
                  <Link to="/">I-AM</Link>
                </Navbar.Brand>
                <Nav pullRight>
                  <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </Nav>
              </>
          }
        </Navbar.Collapse>
      </Navbar>
      <Routes appProps={{ isAuthenticated, userHasAuthenticated}} />
    </div>     
  );
}

export default withRouter(App);