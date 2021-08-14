import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApiToManageContexts } from "../../../redux/actions/ApiActions";
import PageHeader from "../../Header/PageHeader";
import { BiDoorOpen } from "react-icons/bi";
import { Controls } from "../../controls/controls";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid } from "@material-ui/core";
import ContextHelper from "./ContextHelper";
import ContextList from "./ContextList";

export function ManageContexts({ match }) {
	const dispatch = useDispatch();
	const classes = ContextHelper.useStylesMain();
	const [notify, setNotify] = useState({
		isOpen: false,
		message: "",
		type: "",
	});
	const [currentApi, setCurrentApi] = useState(null);
	const api = useSelector((state) => state.apiState.api);
	useEffect(() => {
		dispatch(getApiToManageContexts(match.params.api_id, setCurrentApi));
	}, [match.params.api_id]);
	return (
		<div>
			<PageHeader
				title={api.name}
				subTitle="Manage your Contexts"
				icon={<BiDoorOpen />}
			/>
			<Grid spacing={2} className={classes.contentSection}>
				{currentApi ? (
					<ContextList currentApi={currentApi} setNotify={setNotify} />
				) : (
					<CircularProgress size={24} />
				)}
			</Grid>
			<Controls.Notification notify={notify} setNotify={setNotify} />
		</div>
	);
}
