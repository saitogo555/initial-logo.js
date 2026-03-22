import { createSignal } from "solid-js";

interface CodePreviewProps {
	codeString: () => string;
}

export function CodePreview(props: CodePreviewProps) {
	const [copied, setCopied] = createSignal(false);

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(props.codeString());
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			// clipboard API unavailable
		}
	};

	return (
		<div class="absolute bottom-0 left-0 right-0 z-10 bg-slate-950/95 backdrop-blur border-t border-slate-800/60">
			{/* Header */}
			<div class="px-4 py-2 flex items-center justify-between border-b border-slate-800/40">
				<span class="text-xs font-mono text-slate-500 select-none">
					Options
				</span>
				<button
					type="button"
					onClick={copy}
					class="cursor-pointer text-xs px-2.5 py-1 rounded-md border border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-500 transition-colors"
				>
					{copied() ? "Copied!" : "Copy"}
				</button>
			</div>
			{/* Code block */}
			<div class="overflow-auto max-h-36 px-4 py-3">
				<pre class="text-xs font-mono text-slate-300 whitespace-pre leading-relaxed">
					{props.codeString()}
				</pre>
			</div>
		</div>
	);
}
