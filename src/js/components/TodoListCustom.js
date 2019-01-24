import React, { Component } from "react";
import DatePicker from "react-datepicker";
import TodoCustomItems from "./TodoCustomItems";
import "./TodoList.css";
import Modal from "react-modal";
import 'react-datepicker/dist/react-datepicker.css';

class TodoListCustom extends Component {
	constructor(props) {
		super(props);

		this.state = {
			items: [],
			showModal: false,
			modalType: '',
			taskName: '',
			dueDate: null,
			description: '',
		};

		this.addItem = this.addItem.bind(this);
		this.editItem = this.editItem.bind(this);
		this.selectItem = this.selectItem.bind(this);
		this.exportList = this.exportList.bind(this);
		this.deleteItems = this.deleteItems.bind(this);
		this.deleteAll = this.deleteAll.bind(this);
		this.showUpdateModal = this.showUpdateModal.bind(this);
		this.taskNameHandler = this.taskNameHandler.bind(this);
		this.dueDateHandler = this.dueDateHandler.bind(this);
		this.descriptionHandler = this.descriptionHandler.bind(this);
    }
	
	addItem(e) {
		if (this.state.taskName !== '' || this.state.dueDate !== "" || this.state.description !== "") {
			let newItem = {
				name: this.state.taskName,
				dueDate: this.state.dueDate,
				description: this.state.description,
				key: Date.now(),
			};

			this.setState((prevState) => {
				return { 
					items: prevState.items.concat(newItem),
					showModal: false,
					dueDate: null,
					name: '',
					description: '',
				};
			});
		}
	}
	
	editItem(e) {
		let selectedItems = this.state.items.filter(function (item) { return item.selected; });
		let selectedItem = selectedItems[0];

		selectedItem.name = this.state.taskName;
		selectedItem.dueDate = this.state.dueDate;
		selectedItem.description = this.state.description;

		this.setState({showModal: false});
	}
	
	selectItem(key) {
		let selectedItems = this.state.items.map(function (item) {
		if (item.key === key) {
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

		this.setState({
			items: selectedItems,
		});
	}
	
	deleteItems() {
		let filteredItems = this.state.items.filter(function (item) {
			return (!item.selected);
		});
	 
		this.setState({
			items: filteredItems
		});
	}
	
	deleteAll() {
		this.setState({
			items: []
		});
	}
	
	exportList() {
		if (this.state.items.length === 0) {
			return null;
		}
		let tasks = this.state.items.map(item => item.name + " " + item.dueDate + " " + item.description + "\r\n");
		let exportLink = document.createElement("a");
		let file = new Blob(tasks, {type: 'text/plain'});
		exportLink.href = URL.createObjectURL(file);
		exportLink.download = "TodoList.txt";
		exportLink.click();
	}
  
	showUpdateModal(e) {
		const buttonValue = e.target.value;
		let isOpen = true;
		if (buttonValue === 'edit') {
			let selectedItems = this.state.items.filter(function (item) { return item.selected; });
			if (selectedItems.length > 1) { 
				alert("More than one task selected. Please only select one for editing."); 
				isOpen = false;
			} else if( selectedItems.length === 0) {
				alert("No task selected. Please selecte one for editing.");
				isOpen = false;
			} else {
				let selectedItem = selectedItems[0];
				this.setState({
					taskName: selectedItem.name,
					dueDate: selectedItem.dueDate,
					description: selectedItem.description,
				});
			}
		} else {
			this.setState({
				taskName: '',
				dueDate: '',
				description: '',
			});
		}

		this.setState({
			showModal: isOpen,
			modalType: e.target.value,
		});
	}

	hideModal = () => {
		this.setState({ showModal: false });
	};

	taskNameHandler(e) {
		this.setState({taskName: e.target.value});
	}

	dueDateHandler(date) {
		this.setState({dueDate: date});
	}

	descriptionHandler(e) {
		this.setState({description: e.target.value});
	}
  
	render() {
		return (
			<div className="todoListMain">
				<div className="header">
					<form>
						<button type="button" onClick={this.showUpdateModal} value='add'>add</button>
						<button type="button" onClick={this.showUpdateModal} value='edit'>edit</button>
						<button type="button" onClick={this.exportList}>export</button>
						<button type="button" onClick={this.deleteItems}>delete</button>
						<button type="button" onClick={this.deleteAll}>delete all</button>
					</form>
				</div>
				<TodoCustomItems entries={this.state.items} select={this.selectItem}/>
				<Modal isOpen={this.state.showModal}>
					<h1>{this.state.modalType} a Task</h1>
					<form>
						<p>Name:</p>
						<input value={this.state.taskName} onChange={this.taskNameHandler}>
						</input>
						<p>Due Date:</p>
						<DatePicker selected={this.state.dueDate} onChange={this.dueDateHandler} />
						<p>Description:</p>
						<input value={this.state.description} onChange={this.descriptionHandler}>
						</input>
					</form>
					<button type="button" onClick={() => {this.state.modalType === 'add' ? this.addItem() : this.editItem()}}>
						{this.state.modalType}
					</button>
					<button type="button" onClick={this.hideModal}>
						cancel
					</button>
				</Modal>
			</div>
		);
	}
}
 
export default TodoListCustom;
