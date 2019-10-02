import React, { Component } from 'react';
import { Table, Toast } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchAllProducts, deleteSelectedProduct, editProduct } from '../action/';

class ProductList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showToast: false,
			toastType: '',
			product: [],
			filterProduct: [],
			redirect: false
		}
	}
	componentDidMount() {
		this.props.fetchAllProducts().then(res => {
			this.setState({
				product: res,
				filterProduct: res
			})

		})

	}
	setShow = (msz) => {
		this.setState({
			showToast: msz
		})
	}
	deleteProduct(id) {
		this.props.deleteSelectedProduct(id).then(res => {
			console.log(res);
			this.setState({
				showToast: true,
				toastType: 'success',
				message: `Product : ${res[1].data.productName} deleted successfully`,
				product: res[0],
				filterProduct: res[0]
			})
		})

	}
	editProduct=(editObject)=>{
		this.props.editProduct(editObject);
		this.setState({
			redirect:true
		})
	}
	filterTable = (event) => {
		let data = this.state.product.filter(curr => {
			return curr.productName.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1
		})

		this.setState({
			filterProduct: data
		})

	}
	render() {
		console.log(this.state.filterProduct.length);
		
		if (this.state.redirect)
			return <Redirect push to='/' />
		let tableBody ;
		if (this.state.filterProduct.length>0) {
			tableBody = this.state.filterProduct.map((curr, i) => {
				return (
					<tr key={curr._id}>
						<td>{i + 1}</td>
						<td>{curr.productName}</td>
						<td>{curr.productDescription}</td>
						<td>{curr.productPrice}</td>
						<td onClick={() => this.editProduct(curr)}><i className="fa fa-edit"></i></td>
						<td onClick={() => this.deleteProduct(curr._id)}><i className="fa fa-trash"></i></td>
					</tr>
				)
			})
		}
		else{
			tableBody = <tr><td>Product list is empty</td></tr>;
		}
		return (
			<div className='table-content'>
				<input className='input-search' type="text" onChange={(e) => this.filterTable(e)} placeholder="Search By Product Name..." />

				<Table responsive>
					<thead>
						<tr>
							<th>#</th>
							<th>Product Name</th>
							<th>Product Description</th>
							<th>Product Price</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{tableBody}
					</tbody>

				</Table>
				<Toast onClose={() => this.setShow(false)} show={this.state.showToast} delay={3000}
					className={"toast " + (this.state.toastType)} autohide>
					<Toast.Body>{this.state.message}</Toast.Body>
				</Toast>
			</div>
		);
	}
}

function initMapStateToProps(state) {
	console.log(state);

	return {
		state
	}
}
function initMapDispatchToProps(dispatch) {
	return bindActionCreators({
		fetchAllProducts,
		deleteSelectedProduct,
		editProduct
	}, dispatch)
}
export default connect(initMapStateToProps, initMapDispatchToProps)(ProductList);