import React from "react";
import TodoListCustom from "./TodoListCustom.js";
import Form from "./Form.jsx";
import List from "./List.jsx";
import UpdateModal from "./UpdateModal.jsx";

const App = () => (
  <div>
		<h3>This is a standard React TodoList</h3>
		<TodoListCustom/>
		<h3>This is a React TodoList utilizing Redux</h3>
		<div className="todoListMain">
		<Form/>
		<List/>
		<UpdateModal /> 
		</div>
  </div>
);
export default App;