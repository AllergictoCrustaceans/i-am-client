import React, {useState, useEffect} from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import {Auth} from 'aws-amplify';
import "./App.css";
import Routes from "./Routes";
// import background from './sean-martin-bMhTQ4jdJtg-unsplash.jpg';

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


  // const useWindowWith = () => {
  //   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  //   const handleWindowResize = () => {
  //     setWindowWidth(window.innerWidth);
  //   };

  //   useEffect(() => {
  //     window.addEventListener('resize', handleWindowResize);
  //     return () => window.removeEventListener('resize', handleWindowResize);
  //   }, []);

  //   return windowWidth;
  // }

  // const imageUrl =useWindowWith() >= 650 ? background : 'Screen to small to display image :(';

  return (
    !isAuthenticating &&
    <div className="App container" style={{backgroundColor: 'white'}}>
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
                  <NavItem className = "navItem" onClick={handleLogout}>Logout</NavItem>
                </Nav> 
              </>
            : <>
                <Navbar.Brand>
                  <Link to="/">I-AM</Link>
                </Navbar.Brand>
                <Nav pullRight>
                  <LinkContainer to="/signup">
                    <NavItem className = "navItem">Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem className = "navItem">Login</NavItem>
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