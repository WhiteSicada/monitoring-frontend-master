import React from "react";
import {
	FormControlLabel,
	FormControl,
	FormLabel,
	Radio,
	RadioGroup as MUIRadioGroup,
} from "@material-ui/core";

function RadioGroup(props) {
	const { value, onChange, name, label, items } = props;
	return (
		<FormControl>
			<FormLabel>
				<MUIRadioGroup row value={value} onChange={onChange} name={name}>
					{items.map((item, index) => (
						<FormControlLabel
							value={item.id}
							label={item.title}
							control={<Radio />}
						/>
					))}
				</MUIRadioGroup>
			</FormLabel>
		</FormControl>
	);
}

export default RadioGroup;
