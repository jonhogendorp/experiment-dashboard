"use client";

import { useState } from "react";

interface SubscriptionFormProps {
	newSubscription: {
		name: string;
		price: string;
		renewalDate: string;
		category?: string; // Optional category field
	};
	setNewSubscription: (subscription: {
		name: string;
		price: string;
		renewalDate: string;
		category?: string; // Optional category field
	}) => void;
	addSubscription: () => void;
}

export default function SubscriptionForm({
	newSubscription,
	setNewSubscription,
	addSubscription,
}: SubscriptionFormProps) {
	const [isFormOpen, setIsFormOpen] = useState(false);

	return (
		<div>
			<button
				className='bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 mb-4'
				onClick={() => setIsFormOpen(true)}
			>
				Add New Subscription
			</button>

			{isFormOpen && (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/15 bg-opacity-30'>
					<div className='bg-white rounded-lg shadow-lg p-6 min-w-[350px]'>
						<div className='mb-4 flex flex-col items-start gap-4 p-4'>
							<h2 className='text-lg font-semibold'>Add New Subscription</h2>
							<input
								type='text'
								placeholder='Name'
								value={newSubscription.name}
								onChange={(e) =>
									setNewSubscription({
										...newSubscription,
										name: e.target.value,
									})
								}
								className='border p-2 mr-2 rounded-md shadow-sm'
							/>
							<input
								type='number'
								placeholder='Price'
								value={newSubscription.price}
								onChange={(e) =>
									setNewSubscription({
										...newSubscription,
										price: e.target.value,
									})
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
							<input
								type='text'
								placeholder='Category (optional)'
								value={newSubscription.category}
								onChange={(e) =>
									setNewSubscription({
										...newSubscription,
										category: e.target.value,
									})
								}
								className='border p-2 mr-2 rounded-md shadow-sm'
							/>
							<div className='flex flex-row gap-2 w-full'>
								<button
									onClick={addSubscription}
									className='bg-blue-500 text-white py-1.5 px-5 rounded-full shadow-md hover:bg-blue-600'
								>
									Add
								</button>
								<button
									className='  bg-slate-200 rounded-full text-slate-800 py-1.5 px-5 hover:bg-slate-300'
									onClick={() => setIsFormOpen(false)}
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
