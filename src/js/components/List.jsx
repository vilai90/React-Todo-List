import React from "react";
import { connect } from "react-redux";
import { selectItem } from "../actions/index";

function mapDispatchToProps(dispatch) {
	return {
		selectItem: itemKey => dispatch(selectItem(itemKey)),
	};
}

const mapStateToProps = state => {
	return { items: state.items };
};

const ConnectedList = ({ items, selectItem }) => (
	<ul className="theList">
		{items.map(item => (
		<li onClick={() => selectItem(item.key)} className={item.className} key={item.key}>
			{item.taskName}
		</li>
		))}
	</ul>
);

const List = connect(mapStateToProps, mapDispatchToProps)(ConnectedList);
export default List;