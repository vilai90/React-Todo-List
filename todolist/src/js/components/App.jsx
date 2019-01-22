import React from "react";
import TodoList from "./TodoList.js";
import TodoListCustom from "./TodoListCustom.js";
import Form from "./Form.jsx";



const App = () => (
  <div>
		<h3>This is a standard React TodoList</h3>
		<TodoListCustom/>
		<h3>This is a React TodoList utilizing Redux</h3>
		<Form/>
    </div>
);
export default App;