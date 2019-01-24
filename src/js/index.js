import store from "../js/store/index";
import { addItem } from "../js/actions/index";
import { editItem } from "../js/actions/index";
import { hideModal } from "../js/actions/index";
import { deleteItems } from "../js/actions/index";
import { deleteAll } from "../js/actions/index";
import { exportAll } from "../js/actions/index";
import { showModal } from "../js/actions/index";

window.store = store;
window.addItem = addItem;
window.editItem = editItem;
window.hideModal = hideModal;
window.deleteItems = deleteItems;
window.deleteAll = deleteAll;
window.exportAll = exportAll;
window.showModal = showModal;