import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import uuidv1 from "uuid";
import { addItem } from "../actions/index";
import { editItem } from "../actions/index";
import { hideModal } from "../actions/index";

function mapDispatchToProps(dispatch) {
	return {
		addItem: item => dispatch(addItem(item)),
		editItem: item => dispatch(editItem(item)),
		hideModal: () => dispatch(hideModal()),
	};
}

function mapStateToProps(state){
	return { 
		isOpen: state.showModal,
		modalType: state.modalType,
		editedItem: state.editedItem,
	};
}

class ConnectedModal extends Component {
	constructor() {
		super();

		this.state = {
			taskName: '',
			dueDate: null,
			description: '',
		};

		this.add = this.add.bind(this);
		this.edit = this.edit.bind(this);
		this.taskNameHandler = this.taskNameHandler.bind(this);
		this.dueDateHandler = this.dueDateHandler.bind(this);
		this.descriptionHandler = this.descriptionHandler.bind(this);
		this.hideModal = this.hideModal.bind(this);
		this.fillForm = this.fillForm.bind(this);
		this.cancelClick = this.cancelClick.bind(this);
	}
  
	add(e) {		
		const uid = uuidv1();
		let newItem = {
		  taskName: this.state.taskName,
		  dueDate: this.state.dueDate,
		  description: this.state.description,
		  key: uid,
		  selected: false,
		};
		
		this.props.addItem(newItem);
		this.hideModal();
	}
	
	
	edit(e) {
		let editedItem = this.props.editedItem;
		editedItem.taskName = this.state.taskName;
		editedItem.dueDate = this.state.dueDate;
		editedItem.description = this.state.description;
		this.props.editItem(editedItem);
		this.hideModal();
	}
  
	taskNameHandler(e) {
		this.setState({taskName: e.target.value});
	}
  
	dueDateHandler(date) {
		this.setState({dueDate: date});
	}
  
	descriptionHandler(e) {
		this.setState({description: e.target.value});
	}
  
	fillForm(e) {
		if (this.props.modalType === 'edit') {
			const editItem = this.props.editedItem;
			this.setState({
				taskName: editItem.taskName,
				dueDate: editItem.dueDate,
				description: editItem.description,
			});
		}
	}
  
	cancelClick(e) {
		e.preventDefault();
		this.hideModal()
	}
  
	hideModal() {
		this.props.hideModal();
		this.setState({
			taskName: '',
			dueDate: null,
			description: '',
		});
	}
  
	render() {
		return (
			<Modal isOpen={this.props.isOpen} onAfterOpen={this.fillForm}>
				<h1>{this.props.modalType} a Task</h1>
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
				<button type="button" onClick={() => {this.props.modalType === 'add' ? this.add() : this.edit()}}>
					{this.props.modalType}
				</button>
				<button type="button" onClick={this.cancelClick}>
					cancel
				</button>
			</Modal>
		);
	}
}

const UpdateModal = connect(mapStateToProps, mapDispatchToProps)(ConnectedModal);
export default UpdateModal;