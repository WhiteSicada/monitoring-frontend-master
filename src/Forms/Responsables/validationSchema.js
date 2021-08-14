import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
	name: Yup.string().required("Ce champ est requis !"),
	email: Yup.string().email().required("Ce champ est requis !"),
});
