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
	return (
		<div className='mb-4 flex flex-col items-start gap-4 p-4'>
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
			<button
				onClick={addSubscription}
				className='bg-blue-500 text-white p-2 rounded-md shadow-md hover:bg-blue-600'
			>
				Add
			</button>
		</div>
	);
}
