import {
	saveProduct,
	fetchProducts,
	deleteProduct,
	editSelectedProduct
} from '../service/httpService';

export function registerProduct(data) {
	console.log(data);
	return function (dispatch) {
		return saveProduct(data).then(res => {
			console.log(res.data)
			return (res.data);
		});
	}
}
export function fetchAllProducts() {
	return function (dispatch) {
		return fetchProducts().then(res => {
			console.log(res.data);
			return res.data;
		})
	}
}
export function deleteSelectedProduct(id) {
	console.log(id);

	return function (dispatch) {
		return deleteProduct(id).then(res1 => {
			return fetchAllProducts()(dispatch).then((res) => {
				console.log(res);
				
				return [res,res1];
			})


		})
	}
}
export function editProduct(editObject) {
	return {
		type: "EDIT_PRODUCT",
		payload: editObject
	}
}


export function editProductDetails(data) {
	console.log(data);
	function success(data) {
		return {
			type: "EDIT_PRODUCT",
			payload: data
		}
	}
	return function (dispatch) {
		return editSelectedProduct(data).then(res => {
			console.log(res.data);
			dispatch(success(undefined))
			return (res.data);

		})
	}
}