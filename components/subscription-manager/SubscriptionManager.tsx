import { useState } from "react";
import SubscriptionList from "./SubscriptionList";
import SubscriptionForm from "./SubscriptionForm";
import SubscriptionDialog from "./SubscriptionDialog";

export interface Subscription {
	id: number;
	name: string;
	price: number;
	renewalDate: string;
}

export default function SubscriptionManager() {
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
		if (
			!newSubscription.name ||
			!newSubscription.price ||
			!newSubscription.renewalDate
		) {
			alert("All fields are required.");
			return;
		}
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

	const deleteSubscription = (id: number) => {
		setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
		setSelectedSubscription(null);
	};

	return (
		<div className='p-4 flex flex-col items-center '>
			<h1 className='text-xl font-bold mb-4'>Subscription Manager</h1>

			<SubscriptionForm
				newSubscription={newSubscription}
				setNewSubscription={setNewSubscription}
				addSubscription={addSubscription}
			/>
			{/* category picker */}
			<div className='my-4 border-t pt-4 w-full flex flex-col items-center'>
				<div className='flex flex-row gap-2'>
					<button className='px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition'>
						Streaming
					</button>
					<button className='px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition'>
						Music
					</button>
					<button className='px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold hover:bg-yellow-200 transition'>
						Productivity
					</button>
					<button className='px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-semibold hover:bg-purple-200 transition'>
						Other
					</button>
				</div>
			</div>

			<SubscriptionList
				subscriptions={subscriptions}
				setSelectedSubscription={setSelectedSubscription}
			/>

			{selectedSubscription && (
				<SubscriptionDialog
					selectedSubscription={selectedSubscription}
					setSelectedSubscription={setSelectedSubscription}
					updateSubscription={updateSubscription}
					deleteSubscription={deleteSubscription}
				/>
			)}
		</div>
	);
}
