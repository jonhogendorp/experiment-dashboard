import { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import SubscriptionList from "./SubscriptionList";
import SubscriptionForm from "./SubscriptionForm";
import SubscriptionDialog from "./SubscriptionDialog";
import CategoryPicker from "./CategoryPicker";
import { PlusIcon } from "lucide-react";

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

	const [isFormOpen, setIsFormOpen] = useState(false);

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

			<button
				className='bg-blue-500 text-white p-2 flex justify-between items-center rounded-md shadow-md hover:bg-blue-600 mb-4'
				onClick={() => setIsFormOpen(true)}
			>
				<PlusIcon className='inline-block mr-2' />
				Add New Subscription
			</button>

			{isFormOpen && (
				<SubscriptionForm
					newSubscription={newSubscription}
					setNewSubscription={setNewSubscription}
					addSubscription={addSubscription}
					onClose={() => setIsFormOpen(false)}
				/>
			)}

			<CategoryPicker
				onSelect={(category) =>
					setNewSubscription({ ...newSubscription, category })
				}
			/>

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
