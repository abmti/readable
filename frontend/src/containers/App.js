import React, { Component } from 'react'
import { Route, Switch, Link} from 'react-router-dom'
import { NavbarToggler, Container, Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { FaPlusCircle } from 'react-icons/lib/fa';
import { ToastContainer } from 'react-toastify';

import Home from './Home'
import About from './About'
import PostForm from './PostForm'
import PostShow from './PostShow'
import CategoryShow from './CategoryShow'

class App extends Component {

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            showNavbar: false
        };
    }

    toggleNavbar(e) {
        e.preventDefault();
        this.setState({
            showNavbar: !this.state.showNavbar
        });
    }

    render() {
        return (
            <div>
                <Navbar className="header bd-navbar" color="blue" dark expand="md">
                    <Container>
                        <NavbarBrand tag={Link} to="/">Leitura</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} />
                        <Collapse navbar isOpen={this.state.showNavbar}>
                            <Nav navbar className="mr-sm-auto">
                                <NavItem>
                                    <NavLink tag={Link} className="nav-link" to="/about">About</NavLink>
                                </NavItem>
                            </Nav>
                            <Nav navbar className="ml-sm-auto">
                                <NavItem>
                                    <Link className="btn btn-primary btn-sm text-light" to="/posts/new">
                                        <FaPlusCircle /> Create Post
                                    </Link>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>

                <Container className='content'>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/posts/new" component={PostForm}/>
                        <Route path="/posts/:id/edit" component={PostForm}/>
                        <Route path="/posts/:id" component={PostShow}/>
                        <Route path="/categories/:category" component={CategoryShow}/>
                        <Route path="/about" component={About}/>
                        <Route render={() => <p className="error">Not found.</p>} />
                    </Switch>
                </Container>


                <ToastContainer
                    position="top-right"
                    type="default"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    pauseOnHover />


            </div>
        );
    }

}

export default App
