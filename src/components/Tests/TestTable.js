import React, { useState } from "react";
import {
	TableBody,
	TableRow,
	TableCell,
	CircularProgress,
} from "@material-ui/core";
import { Controls } from "../controls/controls";
import { BiCube } from "react-icons/bi";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { FaTasks, FaPlay } from "react-icons/fa";
import ScanService from "../../services/ScanService";
import { useHistory } from "react-router-dom";

function TestTable({
	recordsAfterPadingAndSorting,
	openInPopup,
	setConfirmDialog,
	onDelete,
	openInTransferListPopup,
	// openInListScan
}) {
	const [loading, setLoading] = useState(false);
	const history = useHistory();
	function goToScanList(test) {
		history.push(`/tests/${test.id}/scans`);
	}
	const launchScan = (id) => {
		setLoading(true);
		ScanService.launchScan(id).then((response) => {
			setLoading(false);
		});
	};
	return (
		<TableBody>
			{recordsAfterPadingAndSorting().map((test, index) => (
				<TableRow key={test.id}>
					<TableCell>{test.name}</TableCell>
					<TableCell>{test.interval} minutes</TableCell>
					<TableCell>
						{test.listAPIs
							? test.listAPIs.length > 1
								? test.listAPIs.length + " APIs"
								: test.listAPIs.length + " API"
							: "0 API"}
					</TableCell>
					<TableCell>
						{test.listAPIs
							? test.listAPIs.map((api) => <span>{api.name},</span>)
							: "No API found !"}
					</TableCell>
					<TableCell>
						<Controls.ActionButton
							text={"Launch Scan"}
							color="primary"
							onClick={() => {
								launchScan(test.id);
							}}
						>
							{loading && (
								<div
									style={{
										display: "flex",
										alignItems: "center",
										flexWrap: "wrap",
									}}
								>
									<CircularProgress size={18} />
									<span style={{ marginLeft: 5 }}>Scanning ...</span>
								</div>
							)}
							{!loading && (
								<div
									style={{
										display: "flex",
										alignItems: "center",
										flexWrap: "wrap",
									}}
								>
									<FaPlay fontSize="large" color="green" />
									<span style={{ marginLeft: 5 }}>Launch Scan</span>
								</div>
							)}
						</Controls.ActionButton>
						<Controls.ActionButton
							text={"List of Scans"}
							color="primary"
							onClick={() => {
								goToScanList(test);
							}}
						>
							<FaTasks fontSize="large" />
						</Controls.ActionButton>

						<Controls.ActionButton
							text={"Manage Endpoints"}
							color="primary"
							onClick={() => {
								openInTransferListPopup(test);
							}}
						>
							<BiCube fontSize="large" />
						</Controls.ActionButton>
						<Controls.ActionButton
							id={`update`}
							text={"Edit"}
							color="primary"
							onClick={() => {
								openInPopup(test);
							}}
						>
							<AiOutlineEdit fontSize="large" />
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
										onDelete(test.id);
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

export default TestTable;
