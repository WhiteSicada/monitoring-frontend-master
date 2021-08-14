import React from "react";
import { Wrapper, CheckBox, Label } from "./CheckBoxContext.style";

const CheckBoxContext = ({ name, endpoints, id, label, arrayHelpers }) => (
	<Wrapper>
		<CheckBox
			type="checkbox"
			name={name}
			id={id}
			onClick={() => {
				let contexts = arrayHelpers.form.values.contexts;
				if (contexts.includes(name)) {
					contexts.forEach((context, index) => {
						if (context === name) {
							arrayHelpers.remove(index);
						}
					});
				} else {
					arrayHelpers.push(name);
				}
			}}
		/>
		<Label htmlFor={id}>
			<p>{label}</p>
			<p>Endpoints : {endpoints}</p>
		</Label>
	</Wrapper>
);

export default CheckBoxContext;
