import * as Yup from "yup";

export const validationSchemaEndpoint = Yup.object().shape({
	name: Yup.string().required("Ce champ est requis !"),
	url: Yup.string().required("Ce champ est requis !"),
	method: Yup.string().required("Ce champ est requis !"),
	// data: Yup.string().required("Ce champ est requis !"),
});
