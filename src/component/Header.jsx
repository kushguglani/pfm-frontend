import React from 'react';
import { Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink} from 'react-router-dom';
 

function Product() {
		return (
			<header>
				<nav className='header-container'>
					<h2 className='top-heading'>Product Management System</h2>
					<Nav variant="tabs" defaultActiveKey="/">
						<Nav.Item>
							<NavLink to="/" activeClassName="selected" exact>Add Product</NavLink>
						</Nav.Item>
						<Nav.Item>
							<NavLink to="/prodList" activeClassName="selected">Product List</NavLink>
						</Nav.Item>
					</Nav>
				</nav>
			</header>
		);
	
}

export default Product;