// src/js/actions/index.js
import { ADD_ITEM } from "../constants/action-types";
import { EDIT_ITEM } from "../constants/action-types";
import { DELETE_ITEM } from "../constants/action-types";
import { SELECT_ITEM } from "../constants/action-types";
import { DELETE_ALL } from "../constants/action-types";
import { EXPORT_ALL } from "../constants/action-types";
import { SHOW_MODAL } from "../constants/action-types";
import { HIDE_MODAL } from "../constants/action-types";

export function addItem(payload) {
  return { type: ADD_ITEM, payload };
}

export function editItem(payload) {
  return { type: EDIT_ITEM, payload };
}

export function deleteItems() {
  return { type: DELETE_ITEM };
}

export function selectItem(payload) {
  return { type: SELECT_ITEM, payload };
}

export function deleteAll() {
	return { type: DELETE_ALL };
}

export function exportAll() {
	return { type: EXPORT_ALL };
}

export function showModal(payload) {
	return { type: SHOW_MODAL, payload };
}

export function hideModal() {
	return { type: HIDE_MODAL };
}