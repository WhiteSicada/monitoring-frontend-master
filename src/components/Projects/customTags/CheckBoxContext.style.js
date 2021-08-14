import styled from "styled-components";

export const Wrapper = styled.div`
	display: inline-flex;
`;

export const Label = styled.label`
	border: 1px solid black;
	cursor: pointer;
	border-radius: 3px;
	color: black;
	font-size: 14px;
	margin: 0 16px 16px 0;
	padding: 8px 12px;

	:hover {
		color: #fff;
		border-color: #2c0b06;
		background-color: #ef630b;
	}

	:active {
		color: #fff;
		border-color: #2c0b06;
		background-color: #ef630b;
	}
`;

export const CheckBox = styled.input`
	display: none;

	&:checked + ${Label} {
		color: #fff;
		border-color: transparent;
		background-color: #ef630b;
	}
`;
