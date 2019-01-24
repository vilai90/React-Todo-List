import { ADD_ITEM } from "../constants/action-types";
import { EDIT_ITEM } from "../constants/action-types";
import { DELETE_ITEM } from "../constants/action-types";
import { SELECT_ITEM } from "../constants/action-types";
import { DELETE_ALL } from "../constants/action-types";
import { EXPORT_ALL } from "../constants/action-types";
import { SHOW_MODAL } from "../constants/action-types";
import { HIDE_MODAL } from "../constants/action-types";

const initialState = {
	items: [],
	editedItem: '',
	modalType: '',
	showModal: false,
};

function rootReducer(state = initialState, action) {
	switch(action.type) {
		case ADD_ITEM:
			return Object.assign({}, state, {
				items: state.items.concat(action.payload)
			});

		case EDIT_ITEM:
			const editedItem = action.payload;
			const items = state.items.map(function (item) {
				if (item.key === editedItem.key) {
					item.taskName = editedItem.taskName;
					item.dueDate = editedItem.dueDate;
					item.description = editedItem.description;
				}
				return item;
			});
			
			return Object.assign({}, state, {
				items: items
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

		case SHOW_MODAL:
			const buttonValue = action.payload;
			if (buttonValue === 'edit') {
				let selectedEditItems = state.items.filter(function (item) {
					return item.selected;
				});
				if (selectedEditItems.length > 1) { 
					alert("More than one task selected. Please only select one for editing."); 
					return Object.assign({}, state, {
						showModal: false
					});
				} else if( selectedEditItems.length === 0) {
					alert("No task selected. Please selecte one for editing.");
					return Object.assign({}, state, {
						showModal: false
					});
				} else {
					return Object.assign({}, state, {
						showModal: true,
						modalType: buttonValue,
						editedItem: selectedEditItems[0],
					});
				}
			}

			return Object.assign({}, state, {
				showModal: true,
				modalType: buttonValue,
			});

		case HIDE_MODAL:
			return Object.assign({}, state, {
				showModal: false,
				modalType: '',
			});

		case DELETE_ALL:
			return Object.assign({}, state, {
				items: []
			});

		case EXPORT_ALL:
			if (state.items.length === 0) {
				return null;
			}
			let tasks = state.items.map(item => item.taskName + " " + item.dueDate + " " + item.description + "\r\n");
			let exportLink = document.createElement("a");
			let file = new Blob(tasks, {type: 'text/plain'});
			exportLink.href = URL.createObjectURL(file);
			exportLink.download = "TodoList.txt";
			exportLink.click();
			return state;
			
		default:
			return state;
	}
}
export default rootReducer;