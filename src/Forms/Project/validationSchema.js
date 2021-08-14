import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
	name: Yup.string().required("Ce champ est requis !"),
	responsableIt: Yup.string().required("Ce champ est requis !"),
	responsableMetier: Yup.string().required("Ce champ est requis !"),
	equipe: Yup.string().required("Ce champ est requis !"),
	description: Yup.string().required("Ce champ est requis !"),
});
