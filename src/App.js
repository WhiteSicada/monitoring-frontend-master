import "./App.scss";
import React from "react";
import CustomDrawer from "./components/Header/CustomDrawer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CssBaseline, createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Main as ListTeams } from "./components/Teams/Main";
import { Main as ItResponsables } from "./components/ItResponsables/Main";
import { Main as WorkResponsables } from "./components/WorkResponsable/Main";
import { Main as APIs } from "./components/APIs/Main";
import { Main as Projects } from "./components/Projects/Main";
import AddProject from "./components/Projects/AddProject";
import { Main as Anomalies } from "./components/Anomalies/Main";
import { Main as Tests } from "./components/Tests/Main";
import { Main as Auth } from "./components/Auth/Main";
import { Main as Scans } from "./components/Scans/Main";
import { Main as Home } from "./components/Home/Main";
import { ManageContextEndpoints } from "./components/APIs/endpoints/ManageContextEndpoints";
import { ManageContexts } from "./components/APIs/contexts/ManageContexts";
import {
	ItResponsablesLink,
	TeamLink,
	WorkResponsableLink,
	APIsLink,
	ProjectLink,
	AnomalieLink,
	TestLink,
	AuthLink,
	ScansLink,
	HomeLink,
	ManageContextEndpointsLink,
	ManageContextsLink,
	AddProjectLink,
} from "./components/Header/StaticLinks";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#ef630b",
			light: "#fcd1b6",
		},
		secondary: {
			main: "#4682B4",
			light: "#f8324526",
		},
		background: {
			default: "#fff",
		},
	},
	overrides: {
		MuiAppBar: {
			root: {
				transform: "translateZ(0)",
			},
		},
	},
	props: {
		MuiIconButton: {
			disableRipple: true,
		},
	},
});

function App() {
	return (
		<Router id="root">
			<ThemeProvider theme={theme}>
				<CustomDrawer />
				<div className={"appMain"}>
					<Switch>
						<Route path={AddProjectLink} exact component={AddProject}></Route>
						<Route
							path={ManageContextsLink}
							exact
							component={ManageContexts}
						></Route>
						<Route
							path={ManageContextEndpointsLink}
							exact
							component={ManageContextEndpoints}
						></Route>
						<Route path={TeamLink} exact component={ListTeams}></Route>
						<Route path={HomeLink} exact component={Home}></Route>
						<Route
							path={ItResponsablesLink}
							exact
							component={ItResponsables}
						></Route>
						<Route
							path={WorkResponsableLink}
							exact
							component={WorkResponsables}
						></Route>
						<Route path={APIsLink} exact component={APIs}></Route>
						<Route path={ProjectLink} exact component={Projects}></Route>
						<Route path={AnomalieLink} exact component={Anomalies}></Route>
						<Route path={TestLink} exact component={Tests}></Route>
						<Route path={AuthLink} exact component={Auth}></Route>
						<Route path={ScansLink} exact component={Scans}></Route>
					</Switch>
				</div>
				<CssBaseline />
			</ThemeProvider>
		</Router>
	);
}

export default App;
