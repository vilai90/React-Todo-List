import React, { Component } from "react";
import TodoItems from "./TodoItems";
import "./TodoList.css";
 
class TodoList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			items: []
		};

		this.addItem = this.addItem.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
		this.exportList = this.exportList.bind(this);
		this.deleteAll = this.deleteAll.bind(this);
    }
   
	addItem(e) {
			if (this._inputElement.value !== "") {
		var newItem = {
		  text: this._inputElement.value,
		  key: Date.now()
		};
	 
		this.setState((prevState) => {
		  return { 
			items: prevState.items.concat(newItem) 
		  };
		});
	   
		this._inputElement.value = "";
	  }
	   
	  console.log(this.state.items);
		 
	  e.preventDefault();
	}
	
	deleteItem(key) {
	  var filteredItems = this.state.items.filter(function (item) {
		return (item.key !== key);
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
		var tasks = this.state.items.map(item => item.text + "\r\n");
		var element = document.createElement("a");
		var file = new Blob(tasks, {type: 'text/plain'});
		element.href = URL.createObjectURL(file);
		element.download = "TodoList.txt";
		element.click();
	}
  
	render() {
		return (
		  <div className="todoListMain">
			<div className="header">
			  <form onSubmit={this.addItem}>
				<input ref={(a) => this._inputElement = a} placeholder="enter task">
				</input>
				<button type="submit">add</button>
				<button type="button" onClick={this.exportList}>export</button>
				<button type="button" onClick={this.deleteAll}>delete all</button>
			  </form>
			  
			</div>
			<TodoItems entries={this.state.items} delete={this.deleteItem}/>
		  </div>
		);
	}
}
 
export default TodoList;