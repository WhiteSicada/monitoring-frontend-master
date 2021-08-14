import React from "react";
import {
	Grid,
	IconButton,
	TextField as TextFieldFormParam,
} from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { BiMinusCircle } from "react-icons/bi";

function FormRow({
	inputParamsFields,
	inputParamsField,
	setInputParamsFields,
}) {
	const handleChangeInput = (id, event) => {
		const newInputFields = inputParamsFields.map((i) => {
			if (id === i.id) {
				i[event.target.name] = event.target.value;
			}
			return i;
		});
		setInputParamsFields(newInputFields);
	};

	const handleRemoveFields = (id) => {
		const values = [...inputParamsFields];
		values.splice(
			values.findIndex((value) => value.id === id),
			1
		);
		setInputParamsFields(values);
	};
	return (
		<Grid container>
			<Grid item xs={5}>
				<TextFieldFormParam
					name="context_name"
					label="Context Name"
					variant="outlined"
					value={inputParamsField.variable}
					onChange={(event) => handleChangeInput(inputParamsField.id, event)}
				/>
			</Grid>

			<Grid item xs={2} style={{ margin: "auto" }}>
				<IconButton
					disabled={inputParamsFields.length === 1}
					onClick={() => handleRemoveFields(inputParamsField.id)}
				>
					<BiMinusCircle />
				</IconButton>
			</Grid>
		</Grid>
	);
}

const addComponent = (inputParamsFields, setInputParamsFields) => {
	setInputParamsFields([
		...inputParamsFields,
		{ id: uuidv4(), variable: "", value: "" },
	]);
};

const ApiFormHelper = { FormRow, addComponent };

export default ApiFormHelper;
