import { combineReducers } from "redux";
import ApiReducer from "./ApiReducer";
import ItResponsableReducer from "./ItResponsableReducer";
import TeamReducer from "./TeamReducer";
import WorkResponsableReducer from "./WorkResponsableReducer";
import ProjectReducer from "./ProjectReducer";
import TestReducer from "./TestReducer";


const RootReducer = combineReducers({
	teamState : TeamReducer,
	itResponsableState : ItResponsableReducer,
	workResponsableState : WorkResponsableReducer,
	apiState : ApiReducer,
	projectState : ProjectReducer,
	testState : TestReducer
});

export default RootReducer;
