import React from "react";

function ScanItemDetail({icon,title,detail}) {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				flexWrap: "wrap",
			}}
		>
			{icon}
			<span style={{ marginLeft: 10 }}>{title}</span>
			<span style={{ marginLeft: 10 }}>{detail}</span>
		</div>
	);
}

export default ScanItemDetail;
