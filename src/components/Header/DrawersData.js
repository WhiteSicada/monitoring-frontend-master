import React from "react";
import { FiFolderPlus } from "react-icons/fi";
import { TiFolderOpen } from "react-icons/ti";
import { RiUserSettingsLine } from "react-icons/ri";
import { BsArchive } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FaCubes,FaTasks } from "react-icons/fa";
import { AiOutlineBug } from "react-icons/ai";
import {
	ItResponsablesLink,
	TeamLink,
	WorkResponsableLink,
	APIsLink,
	ProjectLink,
	AnomalieLink,
	TestLink,
} from "./StaticLinks";

export const DrawerData = [
	{
		title: "Tests",
		icon: <FaTasks style={{ fontSize: 35, color: "#2c0b06" }} />,
		path: TestLink,
	},
	{
		title: "Projetcs",
		icon: <TiFolderOpen style={{ fontSize: 35, color: "#2c0b06" }} />,
		path: ProjectLink,
	},
	{
		title: "APIs",
		icon: <FaCubes style={{ fontSize: 35, color: "#2c0b06" }} />,
		path: APIsLink,
	},
	{
		title: "Teams",
		icon: <HiOutlineUserGroup style={{ fontSize: 35, color: "#2c0b06" }} />,
		path: TeamLink,
	},
	{
		title: "Responsables",
		icon: <RiUserSettingsLine style={{ fontSize: 35, color: "#2c0b06" }} />,
		path: "",
		subNavs: [
			{
				title: "It Responsables",
				path: ItResponsablesLink,
				icon: <BsArchive style={{ color: "#ec6413" }} />,
			},
			{
				title: "Work Responsable",
				path: WorkResponsableLink,
				icon: <FiFolderPlus style={{ color: "#ec6413" }} />,
			},
		],
	},
	// {
	// 	title: "Anomalies",
	// 	icon: <AiOutlineBug style={{ fontSize: 35, color: "#2c0b06" }} />,
	// 	path: AnomalieLink,
	// },
];
