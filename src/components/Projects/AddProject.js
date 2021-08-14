import React, { useState, useEffect } from "react";
import ProjectCreationForm from "../../Forms/Project/ProjectCreationForm";
import { useDispatch, useSelector } from "react-redux";
import { getItResponsables } from "../../redux/actions/ItResponsablesActions";
import { getWorkResponsables } from "../../redux/actions/WorkResponsablesActions";
import { getAPIs } from "../../redux/actions/ApiActions";
import { getTeams } from "../../redux/actions/TeamActions";
import PageHeader from "../Header/PageHeader";
import {TiFolderOpen} from "react-icons/ti";
function AddProject() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getItResponsables());
		dispatch(getWorkResponsables());
		dispatch(getTeams());
		dispatch(getAPIs());
	}, []);
	const [notify, setNotify] = useState({
		isOpen: false,
		message: "",
		type: "",
	});
	
	const teams = useSelector((state) => state.teamState.teams);
	const apis = useSelector((state) => state.apiState.apis);
	const itResponsables = useSelector(
		(state) => state.itResponsableState.itResponsables
	);
	const workResponsables = useSelector(
		(state) => state.workResponsableState.workResponsables
	);
	return (
		<div>
    <PageHeader
				title="Add Project Section"
				subTitle="Manage your Projects"
				icon={<TiFolderOpen />}
			/>
			<ProjectCreationForm
				apis={apis}
				teams={teams}
				itResponsables={itResponsables}
				workResponsables={workResponsables}
				setNotify={setNotify}
			/>
		</div>
	);
}

export default AddProject;
