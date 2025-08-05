import {
	Dialog,
	DialogPanel,
	DialogTitle,
	Transition,
	TransitionChild,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import { Subscription } from "./SubscriptionManager";

interface SubscriptionDialogProps {
	selectedSubscription: Subscription;
	setSelectedSubscription: (subscription: Subscription | null) => void;
	updateSubscription: (subscription: Subscription) => void;
	deleteSubscription: (id: number) => void;
}

export default function SubscriptionDialog({
	selectedSubscription,
	setSelectedSubscription,
	updateSubscription,
	deleteSubscription,
}: SubscriptionDialogProps) {
	const [isEditMode, setIsEditMode] = useState(false);

	return (
		<Transition
			appear
			show={!!selectedSubscription}
			as={Fragment}
		>
			<Dialog
				as='div'
				className='relative z-10'
				onClose={() => setSelectedSubscription(null)}
			>
				<TransitionChild
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className='fixed inset-0 bg-black/10 ' />
				</TransitionChild>

				<div className='fixed inset-0 overflow-y-auto'>
					<div className='flex min-h-full items-center justify-center p-4 text-center'>
						<TransitionChild
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'
						>
							<DialogPanel className='w-full p-14 max-w-xl max-h-xl transform overflow-hidden rounded-md bg-white  text-left align-middle shadow-xl transition-all'>
								<DialogTitle
									as='h3'
									className='text-lg font-medium leading-6 text-gray-900'
								>
									{isEditMode ? "Edit Subscription" : "View Subscription"}
								</DialogTitle>
								<div className='mt-2'>
									{isEditMode ? (
										<>
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
										</>
									) : (
										<div>
											<p>
												<strong>Name:</strong> {selectedSubscription.name}
											</p>
											<p>
												<strong>Price:</strong> ${selectedSubscription.price}
											</p>
											<p>
												<strong>Renewal Date:</strong>{" "}
												{selectedSubscription.renewalDate}
											</p>
											<p>
												<strong>Category:</strong>{" "}
												{selectedSubscription.category || "N/A"}
											</p>
										</div>
									)}
								</div>

								<div className='mt-4 flex gap-1.5 justify-between'>
									{isEditMode ? (
										<div className='flex items-center justify-between gap-1.5 w-full mt-2'>
											<button
												type='button'
												className='bg-white text-blue-500 border border-blue-500 border-solid px-5 py-1.5 rounded-full shadow-sm hover:bg-blue-600 '
												onClick={() => updateSubscription(selectedSubscription)}
											>
												Save
											</button>

											<button
												type='button'
												className='bg-slate-50 border border-slate-700 border-solid text-slate-800 px-5 py-1.5 rounded-full shadow-sm hover:bg-slate-100 '
												onClick={() => setIsEditMode(false)}
											>
												Cancel
											</button>
										</div>
									) : (
										<div className='flex items-center  gap-1.5 w-full'>
											<button
												type='button'
												className='bg-white text-blue-500 border border-blue-500 border-solid rounded-full px-5 py-1.5 shadow-sm hover:bg-blue-600 w-full'
												onClick={() => setIsEditMode(true)}
											>
												Edit
											</button>
											<button
												type='button'
												className='bg-white text-red-500 border border-red-500 border-solid rounded-full px-5 py-1.5 hover:bg-red-600 w-full '
												onClick={() =>
													deleteSubscription(selectedSubscription.id)
												}
											>
												Delete
											</button>
										</div>
									)}
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
