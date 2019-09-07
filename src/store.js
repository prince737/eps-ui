import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import rootReducer from "./reducers";

// const persistedState = loadFromLocalStorage();
const middleware = applyMiddleware(promise, thunk);

const store = createStore(rootReducer,middleware);

// store.subscribe(()=>{
//     saveToLocalStorage(store.getState().addOnsReducer.showNaToggleInfo,store.getState().addOnsReducer.showAtaToggleInfo)
// })

export default store