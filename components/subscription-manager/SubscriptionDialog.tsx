import {
	Dialog,
	DialogPanel,
	DialogTitle,
	Transition,
	TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
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
							<DialogPanel className='w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all'>
								<DialogTitle
									as='h3'
									className='text-lg font-medium leading-6 text-gray-900'
								>
									Edit Subscription
								</DialogTitle>
								<div className='mt-2'>
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
								</div>

								<div className='mt-4 flex justify-between'>
									<button
										type='button'
										className='bg-green-500 text-white p-2 rounded-md shadow-sm hover:bg-green-600 w-[48%]'
										onClick={() => updateSubscription(selectedSubscription)}
									>
										Save
									</button>
									<button
										type='button'
										className='bg-red-500 text-white p-2 rounded-md shadow-sm hover:bg-red-600 w-[48%]'
										onClick={() => deleteSubscription(selectedSubscription.id)}
									>
										Delete
									</button>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
