// src/js/components/Form.jsx
import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteItems } from "../actions/index";
import { deleteAll } from "../actions/index";
import { exportAll } from "../actions/index";
import { showModal } from "../actions/index";

function mapDispatchToProps(dispatch) {
	return {
		showModal: modalType => dispatch(showModal(modalType)),
		deleteAll: () => dispatch(deleteAll()),
		deleteItems: () => dispatch(deleteItems()),
		exportAll: () => dispatch(exportAll()),
	};
}
class ConnectedForm extends Component {
	constructor() {
		super();

		this.showUpdateModal = this.showUpdateModal.bind(this);
		this.deleteItems = this.deleteItems.bind(this);
		this.deleteAll = this.deleteAll.bind(this);
		this.exportList = this.exportList.bind(this);
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
	
	render() {
		return (
			<div className="buttonLayer">
					<button onClick={this.showUpdateModal} value='Add'>Add</button>
					<button onClick={this.showUpdateModal} value='Edit'>Edit</button>
					<button onClick={this.exportList}>Export</button>
					<button onClick={this.deleteItems}>Delete</button>
					<button onClick={this.deleteAll}>Delete All</button>
			</div>
		);
	}
}
const Form = connect(null, mapDispatchToProps)(ConnectedForm);
export default Form;