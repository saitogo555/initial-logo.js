import { cn } from "../../lib/utils";

interface ToggleProps {
	checked: () => boolean;
	onChange: () => void;
	label: string;
}

export function Toggle(props: ToggleProps) {
	return (
		<button
			type="button"
			role="switch"
			aria-checked={props.checked()}
			aria-label={props.label}
			onClick={props.onChange}
			class={cn(
			"relative shrink-0 w-9 h-5 rounded-full transition-colors duration-200 cursor-pointer",
				"focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
				props.checked() ? "bg-indigo-500" : "bg-slate-700",
			)}
		>
			<span
				class={cn(
					"absolute top-0.5 left-0 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200",
					props.checked() ? "translate-x-4" : "translate-x-0.5",
				)}
			/>
		</button>
	);
}
