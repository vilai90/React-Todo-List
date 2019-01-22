import store from "../js/store/index";
import { addArticle } from "../js/actions/index";
import { foundBadWord } from "../js/actions/index";

window.store = store;
window.addArticle = addArticle;
window.foundBadWord = foundBadWord;