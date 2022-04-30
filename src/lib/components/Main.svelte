<script>
	import AddComment from '$lib/components/AddComment.svelte';
	import Comment from '$lib/components/Comment.svelte';
	import { comments } from '$lib/stores/comments.js';
</script>

<main>
	<div class="px-4 pt-4 md:mx-auto md:max-w-3xl md:px-6 md:pt-6">
		<!-- comments -->
		{#each $comments as comment}
			<Comment
				id={comment.id}
				avatar={comment.user.image.png.replace('./images', '')}
				userName={comment.user.username}
				createdAt={comment.createdAt}
				content={comment.content}
				score={comment.score}
			/>

			<!-- replies to comment -->
			{#if comment.replies.length > 0}
				<div class="flex gap-4">
					<div class="mb-4 h-auto w-2 rounded-full bg-clr-light-gray md:ml-4 md:mb-6" />
					<div class="">
						{#each comment.replies as reply}
							<Comment
								id={reply.id}
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
		<AddComment />
	</div>
</main>
