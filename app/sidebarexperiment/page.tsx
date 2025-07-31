import React from "react";
import TopBar from "./TopBar";
import SideBar from "./Sidebar";
import MainContent from "./MainContent";

export default function page() {
	return (
		<div className='flex flex-col h-screen'>
			<TopBar />
			<div className='flex flex-1'>
				<SideBar />
				<MainContent />
			</div>
		</div>
	);
}
