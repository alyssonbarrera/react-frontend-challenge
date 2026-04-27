import { CineDashLogo } from "@/core/components/cinedash-logo";
import { LoginForm } from "../../forms/login-form";

export function LoginScreen() {
	return (
		<main className="min-h-screen bg-background" data-testid="login-screen">
			<div className="mx-auto grid min-h-screen w-full grid-cols-1 lg:h-screen lg:min-h-0 lg:grid-cols-2 xl:grid-cols-[42%_58%]">
				<section className="flex h-full w-full flex-col px-6 py-8 md:px-10 md:py-12 lg:px-12 lg:py-14">
					<header className="mx-auto w-full max-w-110 md:max-w-120 xl:max-w-130">
						<div className="flex items-center gap-2">
							<CineDashLogo className="size-8" />
							<p className="font-heading text-xl font-bold text-foreground">
								CineDash
							</p>
						</div>
					</header>

					<div className="flex flex-1 items-center py-8 md:items-center md:py-12 md:flex-1 lg:py-0">
						<div className="mx-auto w-full max-w-110 space-y-8 md:max-w-120 xl:max-w-130">
							<div className="inline-flex items-center gap-2 rounded-full bg-accent-cyan dark:bg-accent-cyan-soft px-3 py-1.5 text-xs dark:text-accent-cyan">
								<div className="size-1.5 rounded-full bg-black dark:bg-accent-cyan" />
								<span className="font-medium tracking-[0.03em]">
									Welcome back
								</span>
							</div>

							<div className="space-y-5">
								<h1 className="font-heading text-4xl leading-[1.02] font-bold tracking-[-0.04em] text-foreground md:text-5xl xl:text-6xl">
									Login to your cinematic library.
								</h1>
								<p className="max-w-115 text-sm leading-relaxed text-secondary md:text-base">
									Curate, organize, and rediscover the films that move you.
								</p>
							</div>

							<LoginForm />
						</div>
					</div>

					<footer className="mx-auto flex w-full max-w-110 flex-wrap items-center justify-between gap-4 pt-8 text-xs text-muted-foreground md:max-w-120 lg:max-w-none lg:pt-6 xl:max-w-130">
						<small>© 2026 CineDash Studios</small>
						<div className="flex items-center gap-5">
							<button type="button" className="hover:text-secondary">
								Privacy
							</button>
							<button type="button" className="hover:text-secondary">
								Terms
							</button>
							<button type="button" className="hover:text-secondary">
								Help
							</button>
						</div>
					</footer>
				</section>

				<section className="relative hidden h-full overflow-hidden lg:block">
					<div className="absolute inset-0 bg-[url('/login-image.webp')] bg-cover bg-center" />
					<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,14,0.1),rgba(10,11,14,0.7)_68%,rgba(10,11,14,0.9))]" />

					<div className="relative flex h-full flex-col justify-end gap-6 p-14">
						<div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/12 bg-black/42 px-3 py-1.5 text-[11px] text-white/72 backdrop-blur-xl">
							<div className="size-1.5 rounded-full bg-accent-amber" />
							This week's spotlight
						</div>

						<h2 className="max-w-140 whitespace-pre-line font-heading text-6xl leading-none font-bold tracking-[-0.04em] text-white/92">
							Anatomy of a Falling Light
						</h2>

						<div className="flex flex-wrap items-center gap-3 text-sm text-white/74">
							<span className="inline-flex items-center gap-1 rounded-lg bg-accent-amber-soft px-2.5 py-1 leading-none text-accent-amber">
								<span className="text-[11px] leading-none">★</span>
								<span className="text-[13px] leading-none font-bold">9.1</span>
							</span>
							<span>Drama · Mystery</span>
							<span className="text-white/45">·</span>
							<span>2h 18m</span>
							<span className="text-white/45">·</span>
							<span>2025</span>
						</div>

						<p className="max-w-130 text-sm leading-relaxed text-white/68 italic">
							"A patient, devastating meditation on memory and the things we
							keep just out of frame."
						</p>
					</div>
				</section>
			</div>
		</main>
	);
}
