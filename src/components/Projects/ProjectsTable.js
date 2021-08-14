import React from "react";
import { TableBody, TableRow, TableCell } from "@material-ui/core";
import { Controls } from "../controls/controls";
import {AiOutlineDelete,AiOutlineEdit} from "react-icons/ai";
import {BiCube} from "react-icons/bi";

function ProjectsTable({
	recordsAfterPadingAndSorting,
	openInPopup,
	setConfirmDialog,
	onDelete,
	openInTransferListPopup
}) {
	return (
		<TableBody>
			{recordsAfterPadingAndSorting().map((project) => (
				<TableRow key={project.id}>
					<TableCell>{project.name}</TableCell>
					<TableCell>Up</TableCell>
					<TableCell>Down</TableCell>
					<TableCell>
						<Controls.ActionButton
							text={"Manage APIs"}
							color="primary"
							onClick={() => {
								openInTransferListPopup(project);
							}}
						>
							<BiCube fontSize="large" />
						</Controls.ActionButton>
						<Controls.ActionButton
							text={"Edit"}
							color="primary"
							onClick={() => {
								openInPopup(project);
							}}
						>
							<AiOutlineEdit fontSize="large" />
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
										onDelete(project.id);
									},
								});
							}}
						>
							<AiOutlineDelete fontSize="large" />
						</Controls.ActionButton>
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
}

export default ProjectsTable;
