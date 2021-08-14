import { FaTasks } from "react-icons/fa";
import { AiOutlineBug, AiOutlineCheck, AiFillTool } from "react-icons/ai";



const cardsData = [
	{ title: "Total Scans", content: "20.000", icon: <FaTasks /> },
  { title: "Successful Scans", content: "20.000", icon: <AiOutlineCheck /> },
  { title: "Anomalies Detected", content: "20.000", icon: <AiOutlineBug /> },
  { title: "Anomalies Fixed", content: "20.000", icon: <AiFillTool /> },
];

const HomeHelper = {
	cardsData,
};

export default HomeHelper;
