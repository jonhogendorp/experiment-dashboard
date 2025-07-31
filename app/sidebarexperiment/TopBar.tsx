import Link from "next/link";
import React from "react";

export default function TopBar() {
	return (
		<nav
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				background: "#282c34",
				color: "#fff",
				padding: "1rem 2rem",
				boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
			}}
		>
			<h1 style={{ margin: 0, fontSize: "1.5rem" }}>Experiment Dashboard</h1>
			<ul
				style={{
					display: "flex",
					listStyle: "none",
					margin: 0,
					padding: 0,
					gap: "1.5rem",
				}}
			>
				<li>
					<Link
						href='/'
						style={{ color: "#fff", textDecoration: "none" }}
					>
						Home
					</Link>
				</li>
				<li>
					<Link
						href='/experiments'
						style={{ color: "#fff", textDecoration: "none" }}
					>
						Experiments
					</Link>
				</li>
				<li>
					<Link
						href='/about'
						style={{ color: "#fff", textDecoration: "none" }}
					>
						About
					</Link>
				</li>
			</ul>
		</nav>
	);
}
