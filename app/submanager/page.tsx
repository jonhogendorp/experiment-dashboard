"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";

function SubscriptionManager() {
	const [subscriptions, setSubscriptions] = useState([
		{ id: 1, name: "Netflix", price: 15.99, renewalDate: "2025-06-15" },
		{ id: 2, name: "Spotify", price: 9.99, renewalDate: "2025-06-20" },
	]);

	const [newSubscription, setNewSubscription] = useState({
		name: "",
		price: "",
		renewalDate: "",
	});

	const addSubscription = () => {
		setSubscriptions([
			...subscriptions,
			{
				id: subscriptions.length + 1,
				name: newSubscription.name,
				price: Number(newSubscription.price),
				renewalDate: newSubscription.renewalDate,
			},
		]);
		setNewSubscription({ name: "", price: "", renewalDate: "" });
	};

	return (
		<div className='p-4'>
			<h1 className='text-xl font-bold mb-4'>Subscription Manager</h1>

			<div className='mb-4'>
				<h2 className='text-lg font-semibold'>Add New Subscription</h2>
				<input
					type='text'
					placeholder='Name'
					value={newSubscription.name}
					onChange={(e) =>
						setNewSubscription({ ...newSubscription, name: e.target.value })
					}
					className='border p-2 mr-2'
				/>
				<input
					type='number'
					placeholder='Price'
					value={newSubscription.price}
					onChange={(e) =>
						setNewSubscription({ ...newSubscription, price: e.target.value })
					}
					className='border p-2 mr-2'
				/>
				<input
					type='date'
					value={newSubscription.renewalDate}
					onChange={(e) =>
						setNewSubscription({
							...newSubscription,
							renewalDate: e.target.value,
						})
					}
					className='border p-2 mr-2'
				/>
				<button
					onClick={addSubscription}
					className='bg-blue-500 text-white p-2 rounded'
				>
					Add
				</button>
			</div>

			<table className='w-full border-collapse border border-gray-300'>
				<thead>
					<tr>
						<th className='border border-gray-300 p-2'>Name</th>
						<th className='border border-gray-300 p-2'>Price</th>
						<th className='border border-gray-300 p-2'>Renewal Date</th>
					</tr>
				</thead>
				<tbody>
					{subscriptions.map((sub) => (
						<tr key={sub.id}>
							<td className='border border-gray-300 p-2'>{sub.name}</td>
							<td className='border border-gray-300 p-2'>${sub.price}</td>
							<td className='border border-gray-300 p-2'>{sub.renewalDate}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default function Page() {
	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "calc(var(--spacing) * 72)",
					"--header-height": "calc(var(--spacing) * 12)",
				} as React.CSSProperties
			}
		>
			<AppSidebar variant='inset' />
			<SidebarInset>
				<SiteHeader />
				<div className='flex flex-1 flex-col'>
					<div className='@container/main flex flex-1 flex-col gap-2'>
						<div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
							<SubscriptionManager />
						</div>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
