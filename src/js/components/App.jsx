import React from "react";
import "./TodoList.css";
import Form from "./Form.jsx";
import List from "./List.jsx";
import UpdateModal from "./UpdateModal.jsx";

const App = () => (
  <div>		
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
		<div className="todoListMain">
		<h3>This is a React TodoList utilizing Redux</h3>
		<Form/>
		<List/>
		<UpdateModal /> 
		</div>
  </div>
);
export default App;