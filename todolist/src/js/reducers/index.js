import { ADD_ITEM } from "../constants/action-types";
import { EDIT_ITEM } from "../constants/action-types";
import { DELETE_ITEM } from "../constants/action-types";
import { SELECT_ITEM } from "../constants/action-types";
import { DELETE_ALL } from "../constants/action-types";
import { EXPORT_ALL } from "../constants/action-types";

const initialState = {
  items: [],
  editItem: '',
};
function rootReducer(state = initialState, action) {

	
	
	switch(action.type) {
		case ADD_ITEM:
    return Object.assign({}, state, {
      items: state.items.concat(action.payload)
    });
	
	case EDIT_ITEM:
		return Object.assign({}, state, {
		  editItem: action.payload
		});
		
		case DELETE_ITEM:
		const selectedDeleteItems = state.items.filter(function (item) {
			return (!item.selected);
		});
		return Object.assign({}, state, {
		  items: selectedDeleteItems
		});
	
	case SELECT_ITEM:
	let selectedItems = state.items.map(function (item) {
		if (item.key === action.payload) {
			if (!item.selected) { 
			  item.className = "listItemSelected";
			  item.selected = true;
			} else {
			  item.className = "";
			  item.selected = false;
			}
		} 
		return item;
	  });
    return Object.assign({}, state, {
		items: selectedItems,
	  });
  
    case DELETE_ALL:
	return Object.assign({}, state, {
      items: []
    });

	case EXPORT_ALL:
		if (state.items.length === 0) {
			return null;
		}
		let tasks = state.items.map(item => item.name + " " + item.dueDate + " " + item.description + "\r\n");
		let exportLink = document.createElement("a");
		let file = new Blob(tasks, {type: 'text/plain'});
		exportLink.href = URL.createObjectURL(file);
		exportLink.download = "TodoList.txt";
		exportLink.click();
	}
  return state;
}
export default rootReducer;