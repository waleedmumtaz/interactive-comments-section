<script>
	import AddComment from '$lib/components/AddComment.svelte';
	import Comment from '$lib/components/Comment.svelte';
	import { comments } from '$lib/stores/comments.js';
	import { flip } from 'svelte/animate';
	import { scale, slide } from 'svelte/transition';

	let confirmDeleteComment = false;
</script>

<main>
	<!-- Overlay for delete confirmation -->
	{#if confirmDeleteComment}
		<div class="absolute inset-0 grid place-items-center bg-black bg-opacity-50">
			<div class="m-4 max-w-sm rounded-md bg-clr-light-gray p-6">
				<p class="text-2xl font-fw-medium text-clr-dark-blue">Delete comment</p>
				<p class="my-3">
					Are you sure you want to delete this comment? This will remove the comment and can't be
					undone.
				</p>
				<div class="flex gap-3">
					<button class="flex-1 rounded-md bg-clr-grayish-blue py-3 uppercase text-clr-white"
						>No, cancel</button
					>
					<button class="flex-1 rounded-md bg-clr-soft-red uppercase text-clr-white"
						>Yes, delete</button
					>
				</div>
			</div>
		</div>
	{/if}

	<div class="px-4 pt-4 md:mx-auto md:max-w-3xl md:px-6 md:pt-6">
		<!-- comments -->
		{#each $comments as comment (comment.id)}
			<div in:slide out:scale|local>
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
						<div class="mb-4 h-auto w-1 rounded-full bg-clr-light-gray md:ml-4 md:mb-6" />
						<div class="w-full">
							{#each comment.replies as reply (reply.id)}
								<div in:slide out:scale|local animate:flip={{ duration: 500 }}>
									<Comment
										id={reply.id}
										avatar={reply.user.image.png.replace('./images', '')}
										userName={reply.user.username}
										createdAt={reply.createdAt}
										content={reply.content}
										score={reply.score}
										replyingTo={reply.replyingTo}
									/>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		{/each}
		<AddComment />
	</div>
</main>
