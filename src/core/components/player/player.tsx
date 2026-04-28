type PlayerProps = {
	youtubeKey: string;
	title?: string;
};

export function Player({ youtubeKey, title }: PlayerProps) {
	return (
		<div className="size-full" data-testid="player">
			<iframe
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowFullScreen
				className="size-full border-0"
				data-testid="player-iframe"
				loading="lazy"
				referrerPolicy="strict-origin-when-cross-origin"
				src={`https://www.youtube-nocookie.com/embed/${youtubeKey}`}
				title={title ?? "Video player"}
			/>
		</div>
	);
}
