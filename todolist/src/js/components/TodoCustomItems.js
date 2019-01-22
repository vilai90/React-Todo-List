import React, { Component } from "react";
 
class TodoCustomItems extends Component {
	constructor(props) {
    super(props);
 
    this.createTasks = this.createTasks.bind(this);
  }
  
  createTasks(item) {
    return <li onClick={() => this.select(item.key)} className={item.className}
              key={item.key}>{item.name}</li>;
  }
 
select(key) {
    this.props.select(key);
  }
 
  render() {
    var todoEntries = this.props.entries;
    var listItems = todoEntries.map(this.createTasks);
 
    return (
      <ul className="theList">
          {listItems}

      </ul>
    );
  }
};
 
export default TodoCustomItems;