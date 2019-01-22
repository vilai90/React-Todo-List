// src/js/components/Form.jsx
import React, { Component } from "react";
import { connect } from "react-redux";
import { editItem } from "../actions/index";
import { deleteItems } from "../actions/index";
import { deleteAll } from "../actions/index";
import { exportAll } from "../actions/index";
import { showModal } from "../actions/index";
import UpdateModal from "./UpdateModal.jsx";
import List from "./List.jsx";

function mapDispatchToProps(dispatch) {
  return {
	editItem: item => dispatch(editItem(item)),
	deleteAll: () => dispatch(deleteAll()),
	deleteItems: () => dispatch(deleteItems()),
	exportAll: () => dispatch(exportAll()),
  };
}
class ConnectedForm extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
	  isOpen: false,
    };

	
	this.hideModal = this.hideModal.bind(this);
	this.showUpdateModal = this.showUpdateModal.bind(this);
	this.deleteItems = this.deleteItems.bind(this);
	this.deleteAll = this.deleteAll.bind(this);
	this.exportList = this.exportList.bind(this);
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
				this.props.editItem(selectedItems[0]);	
			}
		} 
		
	  this.setState({
		modalType: e.target.value,
		isOpen: isOpen,
	  });
	}
	
	exportList(e) {
		e.preventDefault();
		this.props.exportAll();
	}
	
	hideModal(e) {
	 this.setState({
		isOpen: e,
	 });
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
			<List/>
		<UpdateModal isOpen={this.state.isOpen} hideModal={this.hideModal} modalType={this.state.modalType} />
			 
		</div>
		
    );
  }
}
const Form = connect(null, mapDispatchToProps)(ConnectedForm);
export default Form;