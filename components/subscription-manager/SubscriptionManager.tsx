import { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import SubscriptionList from "./SubscriptionList";
import SubscriptionForm from "./SubscriptionForm";
import SubscriptionDialog from "./SubscriptionDialog";

export interface Subscription {
	id: number;
	name: string;
	price: number;
	renewalDate: string;
	category?: string; // Optional category field
}

const GET_SUBSCRIPTIONS = gql`
	query GetSubscriptions {
		subscriptions {
			id
			name
			price
			renewalDate
			category
		}
	}
`;

const ADD_SUBSCRIPTION = gql`
	mutation AddSubscription(
		$name: String!
		$price: Float!
		$renewalDate: String!
		$category: String
	) {
		addSubscription(
			name: $name
			price: $price
			renewalDate: $renewalDate
			category: $category
		) {
			id
			name
			price
			renewalDate
			category
		}
	}
`;

const UPDATE_SUBSCRIPTION = gql`
	mutation UpdateSubscription(
		$id: Int!
		$name: String
		$price: Float
		$renewalDate: String
		$category: String
	) {
		updateSubscription(
			id: $id
			name: $name
			price: $price
			renewalDate: $renewalDate
			category: $category
		) {
			id
			name
			price
			renewalDate
			category
		}
	}
`;

const DELETE_SUBSCRIPTION = gql`
	mutation DeleteSubscription($id: Int!) {
		deleteSubscription(id: $id)
	}
`;

export default function SubscriptionManager() {
	const { data, loading, error, refetch } = useQuery(GET_SUBSCRIPTIONS);
	const [addSubscriptionMutation] = useMutation(ADD_SUBSCRIPTION, {
		onCompleted: () => refetch(),
	});
	const [updateSubscriptionMutation] = useMutation(UPDATE_SUBSCRIPTION, {
		onCompleted: () => refetch(),
	});
	const [deleteSubscriptionMutation] = useMutation(DELETE_SUBSCRIPTION, {
		onCompleted: () => refetch(),
	});

	const [newSubscription, setNewSubscription] = useState<{
		name: string;
		price: string;
		renewalDate: string;
		category?: string;
	}>({
		name: "",
		price: "",
		renewalDate: "",
		category: "", // Optional field for category
	});

	const [selectedSubscription, setSelectedSubscription] =
		useState<Subscription | null>(null);

	// Replace local addSubscription with GraphQL mutation
	const addSubscription = () => {
		if (
			!newSubscription.name ||
			!newSubscription.price ||
			!newSubscription.renewalDate
		) {
			alert("All fields are required.");
			return;
		}
		addSubscriptionMutation({
			variables: {
				name: newSubscription.name,
				price: Number(newSubscription.price),
				renewalDate: newSubscription.renewalDate,
				category: newSubscription.category || "",
			},
		});
		setNewSubscription({ name: "", price: "", renewalDate: "", category: "" }); // Reset form
	};

	// Replace local updateSubscription with GraphQL mutation
	const updateSubscription = (updatedSubscription: Subscription) => {
		updateSubscriptionMutation({
			variables: {
				id: updatedSubscription.id,
				name: updatedSubscription.name,
				price: Number(updatedSubscription.price),
				renewalDate: updatedSubscription.renewalDate,
				category: updatedSubscription.category || "",
			},
		});
		setSelectedSubscription(null);
	};

	const deleteSubscription = (id: number) => {
		deleteSubscriptionMutation({ variables: { id } });
		setSelectedSubscription(null);
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error loading subscriptions</div>;

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
					<button className='px-4 py-2 rounded-full flex flex-row items-center gap-2 bg-slate-200 text-slate-700 font-semibold hover:bg-slate-300 transition'>
						<div className='bg-blue-500 h-3 w-3 rounded-full'></div>
						Streaming
					</button>
					<button className='px-4 py-2 rounded-full flex flex-row items-center gap-2 bg-slate-200 text-slate-700 font-semibold hover:bg-slate-300 transition'>
						<div className='bg-green-500 h-3 w-3 rounded-full'></div>
						Music
					</button>
					<button className='px-4 py-2 rounded-full flex flex-row items-center gap-2  bg-slate-200 text-slate-700 font-semibold hover:bg-slate-300 transition'>
						<div className='bg-yellow-400 h-3 w-3 rounded-full'></div>
						Productivity
					</button>
					<button className='px-4 py-2 rounded-full flex flex-row items-center gap-2  bg-slate-200 text-slate-700 font-semibold hover:bg-slate-300 transition'>
						<div className='bg-purple-500 h-3 w-3 rounded-full'></div>
						Other
					</button>
				</div>
			</div>

			<SubscriptionList
				subscriptions={data.subscriptions}
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
