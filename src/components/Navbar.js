import React from "react";
import Link from "gatsby-link";

const Navbar = () => (
	<nav className="navbar is-transparent">
		<div className="container">
			<div className="navbar-brand is-centered">
				<Link to="/" className="navbar-item">
						<p className="is-size-2 Circular has-text-black">
							Dadhi Machha Gadia Nodal High School Forum
						</p>
				</Link>
			</div>
		</div>
	</nav>
);

export default Navbar;
