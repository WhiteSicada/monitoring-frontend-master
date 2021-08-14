import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
	name: Yup.string().required("Ce champ est requis !"),
	interval: Yup.number().required("Ce champ est requis !"),
});
