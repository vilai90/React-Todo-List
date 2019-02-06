// src/js/components/Form.jsx
import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteItems } from "../actions/index";
import { deleteAll } from "../actions/index";
import { exportAll } from "../actions/index";
import { showModal } from "../actions/index";
import { addItem } from "../actions/index";
import uuidv1 from "uuid";
import axios from 'axios';

function mapDispatchToProps(dispatch) {
	return {
		showModal: modalType => dispatch(showModal(modalType)),
		deleteAll: () => dispatch(deleteAll()),
		deleteItems: () => dispatch(deleteItems()),
		exportAll: () => dispatch(exportAll()),
		addItem: item => dispatch(addItem(item)),
	};
}
class ConnectedForm extends Component {
	constructor() {
		super();

		this.showUpdateModal = this.showUpdateModal.bind(this);
		this.deleteItems = this.deleteItems.bind(this);
		this.deleteAll = this.deleteAll.bind(this);
		this.exportList = this.exportList.bind(this);
		this.addRandomItem = this.addRandomItem.bind(this);
	}
  
	showUpdateModal(e) {
		e.preventDefault();
		this.props.showModal(e.target.value);
	}
	
	exportList(e) {
		e.preventDefault();
		this.props.exportAll();
	}

	deleteItems(e) {
		e.preventDefault();
		this.props.deleteItems();
	}

	deleteAll(e) {
		e.preventDefault();
		this.props.deleteAll();
	}
	
	addRandomItem(e) {
		e.preventDefault();
		axios.get(
			"https://www.eventbriteapi.com/v3/events/search/?location.address=Seattle&token=66X7H5VWDRYYD6VLQFFX"
		).then(
			(response) => {
				console.log(response);
				const uid = uuidv1();
				const event = response.data.events[Math.floor(Math.random() * 11)];
				let newItem = {
					taskName: event.name.text,
					dueDate: event.start.local,
					description: event.description.text,
					key: uid,
					selected: false,		
				};
				this.props.addItem(newItem);
				})
				.catch(function(error) { 
				console.log(error); })
				.then(function() { 
				console.log('this one executes first');
		});
	}
	
	render() {
		return (
			<div className="header">
				<form>
					<button type="button" onClick={this.showUpdateModal} value='add'>Add</button>
					<button type="button" onClick={this.showUpdateModal} value='edit'>Edit</button>
					<button type="button" onClick={this.exportList}>Export</button>
					<button type="button" onClick={this.deleteItems}>Delete</button>
					<button type="button" onClick={this.deleteAll}>Delete All</button>
					<button type="button" onClick={this.addRandomItem} >Add Random Task</button>
				</form>
			</div>
		);
	}
}
const Form = connect(null, mapDispatchToProps)(ConnectedForm);
export default Form;