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
			className="aspect-280/400 w-70 shrink-0 overflow-hidden rounded-[18px] border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
			data-testid="movie-detail-hero-poster"
		>
			<img
				src={src}
				alt={alt}
				loading="lazy"
				className="h-full w-full object-cover"
			/>
		</div>
	);
}
