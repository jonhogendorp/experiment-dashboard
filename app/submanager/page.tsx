"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

interface Subscription {
	id: number;
	name: string;
	price: number;
	renewalDate: string;
}

function SubscriptionManager() {
	const [subscriptions, setSubscriptions] = useState<Subscription[]>([
		{ id: 1, name: "Netflix", price: 15.99, renewalDate: "2025-06-15" },
		{ id: 2, name: "Spotify", price: 9.99, renewalDate: "2025-06-20" },
	]);

	const [newSubscription, setNewSubscription] = useState({
		name: "",
		price: "",
		renewalDate: "",
	});

	const [selectedSubscription, setSelectedSubscription] =
		useState<Subscription | null>(null);

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

	const updateSubscription = (updatedSubscription: Subscription) => {
		setSubscriptions(
			subscriptions.map((sub) =>
				sub.id === updatedSubscription.id ? updatedSubscription : sub
			)
		);
		setSelectedSubscription(null);
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
					className='border p-2 mr-2 rounded-md shadow-sm'
				/>
				<input
					type='number'
					placeholder='Price'
					value={newSubscription.price}
					onChange={(e) =>
						setNewSubscription({ ...newSubscription, price: e.target.value })
					}
					className='border p-2 mr-2 rounded-md shadow-sm'
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
					className='border p-2 mr-2 rounded-md shadow-sm'
				/>
				<button
					onClick={addSubscription}
					className='bg-blue-500 text-white p-2 rounded-md shadow-md hover:bg-blue-600'
				>
					Add
				</button>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{subscriptions.map((sub) => (
					<div
						key={sub.id}
						className='border rounded-lg shadow-md p-4 bg-white cursor-pointer'
						onClick={() => setSelectedSubscription(sub)}
					>
						<h3 className='text-lg font-semibold mb-2'>{sub.name}</h3>
						<p className='text-gray-700'>Price: ${sub.price}</p>
						<p className='text-gray-700'>Renewal Date: {sub.renewalDate}</p>
					</div>
				))}
			</div>

			{selectedSubscription && (
				<Dialog.Root
					open={!!selectedSubscription}
					onOpenChange={(open) => !open && setSelectedSubscription(null)}
				>
					<Dialog.Portal>
						<Dialog.Overlay className='fixed inset-0 bg-black/30' />
						<Dialog.Content className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-4 w-[90vw] max-w-md'>
							<h2 className='text-lg font-semibold mb-4'>Edit Subscription</h2>
							<input
								type='text'
								value={selectedSubscription.name}
								onChange={(e) =>
									setSelectedSubscription({
										...selectedSubscription,
										name: e.target.value,
									} as Subscription)
								}
								className='border p-2 mb-2 rounded-md shadow-sm w-full'
							/>
							<input
								type='number'
								value={selectedSubscription.price}
								onChange={(e) =>
									setSelectedSubscription({
										...selectedSubscription,
										price: Number(e.target.value),
									} as Subscription)
								}
								className='border p-2 mb-2 rounded-md shadow-sm w-full'
							/>
							<input
								type='date'
								value={selectedSubscription.renewalDate}
								onChange={(e) =>
									setSelectedSubscription({
										...selectedSubscription,
										renewalDate: e.target.value,
									} as Subscription)
								}
								className='border p-2 mb-2 rounded-md shadow-sm w-full'
							/>
							<button
								onClick={() => updateSubscription(selectedSubscription)}
								className='bg-green-500 text-white p-2 rounded-md shadow-md hover:bg-green-600 w-full'
							>
								Save
							</button>
							<Dialog.Close asChild>
								<button
									className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
									aria-label='Close'
								>
									&times;
								</button>
							</Dialog.Close>
						</Dialog.Content>
					</Dialog.Portal>
				</Dialog.Root>
			)}
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
