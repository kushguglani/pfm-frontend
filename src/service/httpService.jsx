import axios from 'axios';
import {
	ROOT_API_URL,
	SAVE_PRODUCT,
	FETCH_PRODUCTS,
	DELETE_PRODUCT,
	EDIT_PRODUCT
} from '../lib/constant'
export function saveProduct(data) {
	const url = `${ROOT_API_URL}/${SAVE_PRODUCT}`;
	console.log(url);
	
	return axios({ method: "POST", url: url.trim(), data: data, headers: { 'Content-Type': 'application/json; charset=utf-8' } })
}
export function fetchProducts() {
	const url = `${ROOT_API_URL}/${FETCH_PRODUCTS}`;
	return axios({ method: "GET", url: url.trim(), headers: { 'Content-Type': 'application/json; charset=utf-8' } })
}
export function deleteProduct(id) {
	const url = `${ROOT_API_URL}/${DELETE_PRODUCT}/${id}`;
	return axios({ method: "Patch", url: url.trim(), headers: { 'Content-Type': 'application/json; charset=utf-8' } }) 
}

export function editSelectedProduct(data) {
	const url = `${ROOT_API_URL}/${EDIT_PRODUCT}/${data.id}`;
	return axios({ method: "PUT", url: url.trim(), data: data, headers: { 'Content-Type': 'application/json; charset=utf-8' } })
}