interface CategoryPickerProps {
	onSelect: (category: string) => void;
}

const categories = [
	{ name: "Streaming", color: "bg-blue-500" },
	{ name: "Music", color: "bg-green-500" },
	{ name: "Productivity", color: "bg-yellow-400" },
	{ name: "Other", color: "bg-purple-500" },
];

export default function CategoryPicker({ onSelect }: CategoryPickerProps) {
	return (
		<div className='my-4 border-t pt-4 w-full flex flex-col items-center'>
			<div className='flex flex-row gap-2'>
				{categories.map((cat) => (
					<button
						key={cat.name}
						className='px-4 py-2 rounded-full flex flex-row items-center gap-2 border border-solid border-slate-200 shadow-sm bg-white text-slate-700 font-semibold hover:bg-slate-100 transition'
						onClick={() => onSelect(cat.name)}
					>
						<div className={`${cat.color} h-3 w-3 rounded-full`}></div>
						{cat.name}
					</button>
				))}
			</div>
		</div>
	);
}
