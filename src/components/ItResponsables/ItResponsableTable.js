import React from "react";
import { TableBody, TableRow, TableCell } from "@material-ui/core";
import { Controls } from "../controls/controls";
import * as AiIcons from "react-icons/ai";

export default function WorkResponsableTable({
	recordsAfterPadingAndSorting,
	openInPopup,
	setConfirmDialog,
	onDelete,
}) {
	return (
		<TableBody>
			{recordsAfterPadingAndSorting().map((itResponsable) => (
				<TableRow key={itResponsable.id}>
					{/* <TableCell>{itResponsable.id}</TableCell> */}
					<TableCell>{itResponsable.name}</TableCell>
					<TableCell>{itResponsable.email}</TableCell>
					<TableCell>
						<Controls.ActionButton
							text={"Edit"}
							color="primary"
							onClick={() => {
								openInPopup(itResponsable);
							}}
						>
							<AiIcons.AiOutlineEdit fontSize="large" />
						</Controls.ActionButton>
						<Controls.ActionButton
							text={"Delete"}
							color="primary"
							onClick={() => {
								setConfirmDialog({
									isOpen: true,
									title: "Are you sure to delete this record?",
									subTitle: "You can't undo this operation",
									onConfirm: () => {
										onDelete(itResponsable.id);
									},
								});
							}}
						>
							<AiIcons.AiOutlineDelete fontSize="large" />
						</Controls.ActionButton>
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
}
