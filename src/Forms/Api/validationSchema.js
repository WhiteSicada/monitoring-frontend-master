import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
	name: Yup.string().required("Ce champ est requis !"),
	description: Yup.string().required("Ce champ est requis !"),
	ip: Yup.string().required("Ce champ est requis !"),
	port: Yup.number().required("Ce champ est requis !"),
});
