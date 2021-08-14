import React from "react";
import { TableBody, TableRow, TableCell } from "@material-ui/core";
import { Controls } from "../controls/controls";
import * as AiIcons from "react-icons/ai";

function TeamTable({
	recordsAfterPadingAndSorting,
	openInPopup,
	setConfirmDialog,
	onDelete,
}) {
	return (
		<TableBody>
			{recordsAfterPadingAndSorting().map((team, index) => (
				<TableRow key={team.id}>
					{/* <TableCell>{team.id}</TableCell> */}
					<TableCell>{team.name}</TableCell>
					<TableCell>
						<Controls.ActionButton
							id={`update`}
							text={"Edit"}
							color="primary"
							onClick={() => {
								openInPopup(team);
							}}
						>
							<AiIcons.AiOutlineEdit fontSize="large" />
						</Controls.ActionButton>
						<Controls.ActionButton
							id={`delete${index}`}
							text={"Delete"}
							color="primary"
							onClick={() => {
								setConfirmDialog({
									isOpen: true,
									title: "Are you sure to delete this record?",
									subTitle: "You can't undo this operation",
									onConfirm: () => {
										onDelete(team.id);
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

export default TeamTable;
