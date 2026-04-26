type MovieDetailHeroPosterProps = {
	src: string;
	alt: string;
};

export function MovieDetailHeroPoster({
	src,
	alt,
}: MovieDetailHeroPosterProps) {
	return (
		<div
			className="aspect-280/400 w-32 shrink-0 overflow-hidden rounded-[12px] border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.5)] sm:w-48 sm:rounded-[14px] md:w-70 md:rounded-[18px]"
			data-testid="movie-detail-hero-poster"
		>
			<img
				src={src}
				alt={alt}
				loading="eager"
				fetchPriority="high"
				className="h-full w-full object-cover"
			/>
		</div>
	);
}
