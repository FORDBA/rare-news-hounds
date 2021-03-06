import React from "react"
import { Link } from "react-router-dom"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import "./NavBar.css"
import Logo from "./newshound.jpg"

export const NavBar = () => {
    return (
      <Navbar expand="md">
        <Navbar.Brand as={Link} to="/">
          <img className="navbar__logo" src={Logo} alt="Rare Publishing Platform" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className="navbar__item" as={Link} to="/posts/create">New Post</Nav.Link>
            <Nav.Link className="navbar__item" as={Link} to="/my-posts">My Posts</Nav.Link>
            <Nav.Link className="navbar__item" as={Link} to="/tags">Tags</Nav.Link>
            <Nav.Link className="navbar__item" as={Link} to="/categories">Categories</Nav.Link>
            <Nav.Link className="navbar__item" as={Link} to="/logout">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
}
