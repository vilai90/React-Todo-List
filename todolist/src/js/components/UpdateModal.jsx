import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import uuidv1 from "uuid";
import { addItem } from "../actions/index";

function mapDispatchToProps(dispatch) {
  return {
    addItem: item => dispatch(addItem(item)),
  };
}

const mapStateToProps = state => {
  return { editItem: state.editItem };
};

class ConnectedModal extends Component {
	 constructor() {
    super();
    this.state = {
		taskName: '',
		dueDate: '',
		description: '',
    };

	this.add = this.add.bind(this);
	this.editItem = this.editItem.bind(this);
	this.taskNameHandler = this.taskNameHandler.bind(this);
	this.dueDateHandler = this.dueDateHandler.bind(this);
	this.descriptionHandler = this.descriptionHandler.bind(this);
	this.hideModal = this.hideModal.bind(this);
  }
  
  add(e) {
			if (this.state.taskName !== '' || this.state.dueDate !== "" || this.state.description !== "") {
				
				const uid = uuidv1();
		let newItem = {
		  name: this.state.taskName,
		  dueDate: this.state.dueDate,
		  description: this.state.description,
		  key: uid,
		  selected: false,
		};
		
		this.props.addItem(newItem);
		
		this.setState({
			taskName: '',
			dueDate: '',
			description: '',
		});
		this.props.hideModal(false);
	  }
		 

	}
	
	
	editItem(e) {
		const editItem = this.props.editItem;
		this.setState({
			taskName: editItem.taskName,
			dueDate: editItem.dueDate,
			description: editItem.description,
		});
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
  
  hideModal(e) {
	  e.preventDefault();
	  this.props.hideModal(false);
  }
  
  render() {
	  return (
	   <Modal isOpen={this.props.isOpen}>
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
		<button type="button" onClick={() => {this.props.modalType === 'add' ? this.add() : this.editItem()}}>
			{this.props.modalType}
		</button>
		<button type="button" onClick={this.hideModal}>
		  cancel
		 </button>
	   </Modal>
     );
  }
}

const UpdateModal = connect(null, mapDispatchToProps)(ConnectedModal);
export default UpdateModal;