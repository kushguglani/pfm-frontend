const InitialState = {
	editObject:undefined
}
export default function storedState(state = InitialState, action) {
	switch(action.type){
		case "EDIT_PRODUCT":
		return {
			...state,
			editObject:action.payload
		}
		default:
			return state;
	}
}