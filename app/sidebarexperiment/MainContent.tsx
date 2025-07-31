import React from "react";
import Content from "./Content";

export default function MainContent() {
	return (
		<div className='main-content flex-1 p-4 m-4'>
			<h1 className='text-2xl font-bold mb-4'>Main Content box</h1>
			<Content />
		</div>
	);
}
