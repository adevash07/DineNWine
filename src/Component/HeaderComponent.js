import React from 'react';
import { Navbar, Nav, NavbarToggler, Collapse, NavItem, NavbarBrand, Jumbotron, Button, Modal,
ModalHeader, ModalBody, Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isNavOpen: false,
        isModalOpen: false
    }
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    })
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleLogin(event) {
    this.toggleModal();
    alert(`Username: ${this.username.value} password: ${this.password.value} remember: ${this.remember.checked}` );
    event.preventDefault();
  }

	render() {
		return (
			<React.Fragment>
			 <Navbar className="navbar-dark" expand="md">
      			<div className="container">
              <NavbarToggler onClick={this.toggleNav} />
      				 <NavbarBrand className="mr-auto" style={{color: "#0000aa"}} href="/"> DINE 'n' WHINE </NavbarBrand>
               <Collapse isOpen={this.state.isNavOpen} navbar>
               <Nav navbar>
                  <NavItem>
                    <NavLink className="nav-link" to="/DineNWine">
                      <span className="fa fa-home fa-lg"></span> Home
                    </NavLink>
                  </NavItem>

                   <NavItem>
                    <NavLink className="nav-link" to="/about">
                      <span className="fa fa-info fa-lg"></span> About US
                    </NavLink>
                  </NavItem>

                   <NavItem>
                    <NavLink className="nav-link" to="/menu">
                      <span className="fa fa-list fa-lg"></span> Menu 
                    </NavLink>
                  </NavItem>

                   <NavItem>
                    <NavLink className="nav-link" to="/contact">
                      <span className="fa fa-address-card fa-lg"></span> Contact
                    </NavLink>
                  </NavItem>
               </Nav>
               <Nav className="ml-auto" navbar>
                <NavItem>
                  <Button outline onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span>Login</Button>
                </NavItem>
               </Nav>
               </Collapse>
      			</div>
     		</Navbar>
     		<Jumbotron>
     			<div className="container">
     				<div className="row row-header">
     					<div className="col-12 col-sm-6">
     						<h1 style={{color: "#0000aa"}}> DINE 'n WHINE'</h1>
     						<p> We take insporation from the world 's best cuissines, and create aunique fusion experience . Our lipsmacking crations will leave you </p>
     					</div>
     				</div>
     			</div>
     		</Jumbotron>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                  <Input type="text" id="username" name="username" innerRef={(input) => this.username = input} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                  <Input type="password" id="password" name="password" innerRef={(input) => this.password = input} />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" id="username" name="remember" innerRef={(input) => this.remember = input} /> Remember Me</Label>
              </FormGroup>
                <Button type="submit" value="submit" color="primary">Login</Button>
            </Form>
          </ModalBody>
        </Modal>

			</React.Fragment>
		);
	}
}
 export default Header;