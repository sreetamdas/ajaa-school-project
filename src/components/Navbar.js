import React from "react";
import Link from "gatsby-link";

const Navbar = () => (
	<nav className="navbar is-transparent">
		<div className="container">
			<div className="navbar-brand is-centered">
				<Link to="/" className="navbar-item">
						<p className="JosefinSlab is-size-2">
							Dadhi Machha Gadiya Nodal High School Forum
						</p>
				</Link>
			</div>
		</div>
	</nav>
);

export default Navbar;
