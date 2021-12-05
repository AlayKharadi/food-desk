import { useState } from "react";
import { Container, Nav, Navbar, NavLink } from 'react-bootstrap';
import { NavLink as RouterNav } from 'react-router-dom';

const navlinks = [
	{ id: 0, href: "#home", name: "Home" },
	{ id: 1, href: "#about", name: "About" },
	{ id: 2, href: "#developer", name: "Developer" },
	{ id: 3, href: "#contact", name: "contact" }
];

const Home = () => {
	//for the navbar active link
	const [active, setActive] = useState(window.location.hash === "" ? "#home" : window.location.hash);

	return (
		<>
			{/* Navbar for only the Home Page. */}
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
				<Container>
					<NavLink className="navbar-brand" to='/Home'>
						Food-Desk
					</NavLink>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto">
							{
								navlinks.map(navlink => {
									return (
										<NavLink className={"nav-link" + ((navlink.href === active) ? " active" : "")} href={navlink.href} key={navlink.id} onClick={() => setActive(navlink.href)}>
											{navlink.name}
										</NavLink>
									);
								})
							}
						</Nav>
						<Nav>
							<RouterNav className="nav-link" to="/LogIn">
								Authentication
							</RouterNav>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>

			<h1>Home Page</h1>

		</>
	);
}
export default Home;
