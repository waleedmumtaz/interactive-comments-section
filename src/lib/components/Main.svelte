<script>
	import Comment from '$lib/components/Comment.svelte';
	import data from '$lib/data.json';

	let comments = data.comments;
</script>

<main>
	<div class="p-4 md:mx-auto md:max-w-3xl md:p-6">
		<!-- comments -->
		{#each comments as comment}
			<Comment
				avatar={comment.user.image.png.replace('./images', '')}
				userName={comment.user.username}
				createdAt={comment.createdAt}
				content={comment.content}
				score={comment.score}
			/>

			<!-- replies to comment -->
			{#if comment.replies.length > 0}
				<div class="grid grid-cols-12 md:place-items-center">
					<div class="h-full w-1 bg-clr-light-gray" />
					<div class="col-span-11">
						{#each comment.replies as reply}
							<Comment
								avatar={reply.user.image.png.replace('./images', '')}
								userName={reply.user.username}
								createdAt={reply.createdAt}
								content={reply.content}
								score={reply.score}
							/>
						{/each}
					</div>
				</div>
			{/if}
		{/each}
	</div>
</main>
