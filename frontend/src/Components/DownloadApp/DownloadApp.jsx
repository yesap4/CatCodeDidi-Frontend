import { ArrowLeft, Download } from "lucide-react";
import { Link } from "react-router-dom";

function DownloadApp() {
	return (
		<div className="chat-shell min-h-dvh text-foreground">
			<header className="chat-header flex h-[72px] items-center border-b border-border/70 px-5 sm:px-8">
				<Link
					to="/ChatArea"
					className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
				>
					<ArrowLeft size={16} />
					Back to chat
				</Link>
			</header>
			<main className="mx-auto flex min-h-[calc(100dvh-72px)] w-full max-w-5xl items-center px-6 py-16">
				<section className="max-w-xl">
					<div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card text-accent-foreground">
						<Download size={20} />
					</div>
					<h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl">
						CatCodeDidi, wherever you work.
					</h1>
					<p className="mb-8 max-w-lg text-base leading-7 text-muted-foreground">
						Windows and Android apps are in development. The Windows app will let
						you control your PC hands-free with voice commands. In the meantime,
						you can use CatCodeDidi in your browser.
					</p>
					<Link
						to="/ChatArea"
						className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
					>
						Open chat
					</Link>
				</section>
			</main>
		</div>
	);
}

export default DownloadApp;
