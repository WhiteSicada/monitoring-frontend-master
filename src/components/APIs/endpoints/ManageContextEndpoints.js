import React, { useState, useEffect } from "react";
import PageHeader from "../../Header/PageHeader";
import { FaCubes } from "react-icons/fa";
import ApiHelper from "../ApiHelper";
import { useDispatch, useSelector } from "react-redux";
import ContextCard from "../contexts/ContextCard";
import { Grid } from "@material-ui/core";
import EndpointHelper from "./EndpointHelper";
import ContextListEndpoints from "./ContextListEndpoints";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Controls } from "../../controls/controls";
import { getAPI } from "../../../redux/actions/ApiActions";

export function ManageContextEndpoints({ match }) {
	const dispatch = useDispatch();
	const classes = EndpointHelper.useStylesMain();
	const [notify, setNotify] = useState({
		isOpen: false,
		message: "",
		type: "",
	});
	const [currentContext, setCurrentContext] = useState(null);
	const api = useSelector((state) => state.apiState.api);
	useEffect(() => {
		dispatch(getAPI(match.params.api_id, setCurrentContext));
	}, [match.params.api_id]);
	const [toggleContextCard, setToggleContextCard] = useState(0);
	const toggleTab = (index) => {
		setToggleContextCard(index);
		setCurrentContext(api.contexts[index]);
	};
	return (
		<div>
			<Grid container spacing={2} style={{ marginTop: "4%" }}>
				<Grid item xs={5}>
					<PageHeader
						noMargin
						title={api.name}
						subTitle="Manage your Contexts and Endpoints"
						icon={<FaCubes />}
					/>
				</Grid>
				<Grid item container xs={7}>
					{api.contexts &&
						api.contexts.map((context, index) => (
							<Grid item key={index}>
								<ContextCard
									index={index}
									title={context.name}
									toggleTab={toggleTab}
									toggleContextCard={toggleContextCard}
								/>
							</Grid>
						))}
				</Grid>
			</Grid>
			<Grid spacing={2} className={classes.contentSection}>
				{currentContext ? (
					<ContextListEndpoints
						api={api}
						currentContext={currentContext}
						setNotify={setNotify}
					/>
				) : (
					<CircularProgress size={24} />
				)}
			</Grid>
			<Controls.Notification notify={notify} setNotify={setNotify} />
		</div>
	);
}
