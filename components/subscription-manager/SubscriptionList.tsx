import { Subscription } from "./SubscriptionManager";

interface SubscriptionListProps {
	subscriptions: Subscription[];
	setSelectedSubscription: (subscription: Subscription) => void;
}

export default function SubscriptionList({
	subscriptions,
	setSelectedSubscription,
}: SubscriptionListProps) {
	return (
		<div className='grid my-auto w-[50vw]  grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4'>
			{subscriptions.map((sub) => (
				<div
					key={sub.id}
					className='border rounded-lg shadow-md p-4 bg-white cursor-pointer hover:shadow-lg transition-shadow'
					onClick={() => setSelectedSubscription(sub)}
				>
					<h3 className='text-lg font-semibold mb-2'>{sub.name}</h3>
					<p className='text-gray-700'>Price: ${sub.price}</p>
					<p className='text-gray-700'>Renewal Date: {sub.renewalDate}</p>
				</div>
			))}
		</div>
	);
}
