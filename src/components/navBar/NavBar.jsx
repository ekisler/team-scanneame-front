import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useLocalStorage } from "../../useLocalStorage";
import { Link } from "react-router-dom";
import cartImg from "../../Logo/cart.png";
import styles from "./NavBar.module.css";

import logo from "../../Logo/LogoQR.png";
import { NavItem, Button } from "reactstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink as RouterNavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getUserLogin, getTotalProducts} from "../../redux/actions";
import { NavbarToggler } from "reactstrap";

function NavBar() {

    const dispatch = useDispatch();
    const [cart] = useLocalStorage("cartProducts", []);

    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
    
    useEffect(() => {

        if (cart) dispatch(getTotalProducts(cart.length));
        if (user) dispatch(getUserLogin(user.email, user));
        
      }, [cart, dispatch, user]);
    
      const totalItems = useSelector((state) => state.totalProducts);
      const [isOpen, setIsOpen] = useState(false);

      const toggle = () => setIsOpen(!isOpen);
    
    const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin + "/home",
    });

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
      <NavbarToggler onClick={toggle} />
        <Navbar.Brand href="/home"><img src={logo} height={'75px'} width={'75px'} className={logo} alt="logo" />
</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          
          <Nav className="me-auto">
            <Nav.Link href="/catalogue">Cátalogo</Nav.Link>
            <NavDropdown title="More" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/about">About Us</NavDropdown.Item>
              <NavDropdown.Item href="/contact">Contact</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          

          <Nav>
            
            {!isAuthenticated && (
            <NavItem>
              <Button id="qsLoginBtn" onClick={() => loginWithRedirect()}>
                Login/Register
              </Button>
            </NavItem>
            )}

            {isAuthenticated && (
          <Nav>
            <NavDropdown 
                title="Account" 
                id="collasible-nav-dropdown"
                >

                <NavDropdown.Item>
                    <h6 
                    className="d-inline-block">
                        {user.name}
                        </h6>
                </NavDropdown.Item>

                <NavDropdown.Item 
                    tag={RouterNavLink} 
                    href="/profile" 
                    className="dropdown-profile" 
                    activeclassname="router-link-exact-active"
                    >
                        <FontAwesomeIcon 
                            icon="user" 
                            className="mr-3" /> Profile
                  </NavDropdown.Item>

                <NavDropdown.Item 
                   
                    href="/user/account" 
                    className="dropdown-profile" 
                    activeclassname="router-link-exact-active"
                    >
                        <FontAwesomeIcon   
                        icon="tools" 
                        className="mr-3" /> Edit Account
                </NavDropdown.Item>    

                <NavDropdown.Item href="#" onClick={() => logoutWithRedirect()}>
              <RouterNavLink>
                <FontAwesomeIcon icon="power-off" className="mr-3" /> Logout
              </RouterNavLink>
              </NavDropdown.Item>
        
            </NavDropdown>

            <NavDropdown.Item  href="/cart" id="qsLogoutBtn">

          <div className={styles.itemsCart}>{totalItems} </div>
          <Link to={"/cart"}>
            <img src={cartImg} className={styles.cart} alt="cart" />
          </Link>
          </NavDropdown.Item>
          
          </Nav>

)}


        

        

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;