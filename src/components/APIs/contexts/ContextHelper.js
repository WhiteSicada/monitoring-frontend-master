import { makeStyles } from "@material-ui/core";

const useStylesContextCard = makeStyles((theme) => ({
	card: {
		transition: "0.3s",
		boxShadow: "0 8px 20px -12px rgba(0,0,0,0.3)",
		"&:hover": {
			boxShadow: "0 16px 30px -12.125px rgba(0,0,0,0.3)",
			cursor: "pointer",
		},
    border: "2px solid #fff",
		height: "100%",
	},
	cardActive: {
		transition: "0.3s",
		boxShadow: "0 8px 20px -12px rgba(0,0,0,0.3)",
		"&:hover": {
			boxShadow: "0 16px 30px -12.125px rgba(0,0,0,0.3)",
			cursor: "pointer",
		},
		border: "2px solid #ef630b",
		height: "100%",
	},
	avatar: {
		border: "2px solid #ef630b",
		backgroundColor: "transparent",
		color: "#2c0b06",
	},
	heading: {
		fontWeight: "bold",
	},
}));

const useStylesMain = makeStyles((theme) => ({
	contentSection: {
		marginTop: "2%",
		border: "2px solid #ef630b",
	},
	listContext: {
		marginLeft: "30%",
	},
}));

const ContextHelper = { useStylesContextCard, useStylesMain };
export default ContextHelper;