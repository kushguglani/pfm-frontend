import React, { Component } from 'react';
import { Form, Col, Row, Button, Toast } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import { registerProduct, editProductDetails } from '../action/';
import { Redirect } from 'react-router-dom';

class Product extends Component {
	constructor(props) {
		super(props);
		this.state = {
			productName: '',
			productDescription: '',
			productPrice: '',
			message: '',
			showToast: false,
			toastType: '',
			redirect: false,
			productDetails: 'Add Product Details'
		}
	}
	componentDidMount() {
		console.log(this.props.editList);

		if (this.props.editList) {
			console.log("dfdf");
			let { productName, productDescription, productPrice } = this.props.editList;
			this.setState({
				productDetails: 'Edit Product Details',
				productName,
				productDescription,
				productPrice

			})
		}
	}
	inputChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	setShow = (msz) => {
		this.setState({
			showToast: msz
		})
	}
	submitForm = () => {
		let { productName, productDescription, productPrice } = this.state;
		if (!productName) {
			this.setState({
				message: `Product name can't be empty `,
				showToast: true,
				toastType: 'error'
			})
		}
		else if (!productPrice) {
			this.setState({
				message: `Product price can't be empty `,
				showToast: true,
				toastType: 'error'
			})
		}
		else {
			productPrice = Number(productPrice);
			if (this.props.editList) {
				let id = this.props.editList._id;
				this.props.editProductDetails({ id,productName, productDescription, productPrice }).then(res => {
					console.log("sssd" + res);
					console.log(res);
					this.setState({
						message: `Product : ${res.productName} editted successfully `,
						showToast: true,
						toastType: 'success',
						redirect: true
					});

				})
			}
			else {
				this.props.registerProduct({ productName, productDescription, productPrice }).then(res => {
					console.log("sssd" + res);
					console.log(res);
					this.setState({
						message: `Product : ${res.productName} registered successfully `,
						showToast: true,
						toastType: 'success',
						redirect: true
					});

				})
			}
		}

	}
	render() {
		
		if (this.state.redirect)
			return <Redirect push to='/prodList' />
		return (
			<div className='product-body'>
				<h3>{this.state.productDetails}</h3>
				<Form>
					<Form.Group as={Row} controlId="formPlaintextEmail">
						<Form.Label column sm="3">
							Product Name
    					</Form.Label>
						<Col sm="9">
							<Form.Control
								type="text"
								name='productName'
								value={this.state.productName}
								onChange={(e) => this.inputChange(e)}
								placeholder="Product name" />
						</Col>
					</Form.Group>

					<Form.Group as={Row} controlId="formPlaintextPassword">
						<Form.Label column sm="3">
							Product Description
    				</Form.Label>
						<Col sm="9">
							<Form.Control
								name='productDescription'
								value={ this.state.productDescription}
								onChange={(e) => this.inputChange(e)}
								as="textarea"
								rows="3" />
						</Col>
					</Form.Group>
					<Form.Group as={Row} controlId="formPlaintextEmail">
						<Form.Label column sm="3">
							Product Price
    					</Form.Label>
						<Col sm="9">
							<Form.Control
								type="number"
								name='productPrice'
								value={this.state.productPrice}
								onChange={(e) => this.inputChange(e)}
								placeholder="Product Price" />
						</Col>
					</Form.Group>

					<Button variant="primary" onClick={this.submitForm}>
						Submit
  					</Button>
				</Form>
				<Toast onClose={() => this.setShow(false)} show={this.state.showToast} delay={3000}
					className={"toast " + (this.state.toastType)} autohide>
					<Toast.Body>{this.state.message}</Toast.Body>
				</Toast>
			</div>
		);
	}
}
function initMapStateToProps(state) {

	return {
		editList: state.storedState.editObject
	}
}
function initMapDispatchToProps(dispatch) {
	return bindActionCreators({
		registerProduct,
		editProductDetails
	}, dispatch)
}
export default connect(initMapStateToProps, initMapDispatchToProps)(Product);