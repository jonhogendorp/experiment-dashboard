"use client";

import React, { useState } from "react";

export default function Sidebar() {
	const [isCollapsed, setIsCollapsed] = useState(false);
	return (
		<div>
			<aside
				className={`h-screen bg-gray-100 border-r transition-all duration-200 flex flex-col relative ${
					isCollapsed ? "w-16 items-center" : "w-52"
				}`}
			>
				<button
					onClick={() => setIsCollapsed((prev) => !prev)}
					className={`mt-3 mb-2 p-2 rounded hover:bg-gray-200 transition self-end ${
						isCollapsed ? "self-center" : "self-end"
					}`}
					aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
				>
					{isCollapsed ? <span>&raquo;</span> : <span>&laquo;</span>}
				</button>
				<nav className='w-full'>
					<ul className='flex flex-col gap-2 mt-2'>
						<li className='flex items-center px-4 py-2 hover:bg-gray-200 rounded transition'>
							<span
								role='img'
								aria-label='Home'
								className='text-2xl'
							>
								🏠
							</span>
							{!isCollapsed && <span className='ml-3'>Home</span>}
						</li>
						<li className='flex items-center px-4 py-2 hover:bg-gray-200 rounded transition'>
							<span
								role='img'
								aria-label='Dashboard'
								className='text-2xl'
							>
								📊
							</span>
							{!isCollapsed && <span className='ml-3'>Dashboard</span>}
						</li>
						<li className='flex items-center px-4 py-2 hover:bg-gray-200 rounded transition'>
							<span
								role='img'
								aria-label='Settings'
								className='text-2xl'
							>
								⚙️
							</span>
							{!isCollapsed && <span className='ml-3'>Settings</span>}
						</li>
					</ul>
				</nav>
			</aside>
		</div>
	);
}
