<script>
	import { currentUser } from '$lib/stores/comments.js';
	import { addComment } from '$lib/utils.js';

	let inputComment = '';
</script>

<div>
	<form
		on:submit|preventDefault={() => {
			addComment(inputComment);
			inputComment = '';
		}}
	>
		<!-- mobile input -->
		<div class="rounded-md bg-white p-4 md:hidden md:p-6">
			<textarea
				class="w-full resize-none rounded-md px-4 pt-2 outline outline-1 outline-clr-light-gray focus:outline-clr-dark-blue md:hidden md:p-6"
				rows="5"
				name="input-comment"
				bind:value={inputComment}
				placeholder="Add a comment..."
				aria-label="Add a comment..."
			/>
			<div class="mt-4 flex items-center justify-between">
				<img
					class="max-w-[2rem]"
					src={$currentUser.image.png.replace('./images', '')}
					alt={`Photo of ${$currentUser.username}`}
				/>
				<input
					class="cursor-pointer rounded-md bg-clr-moderate-blue px-8 py-3 font-fw-medium uppercase text-clr-white outline-offset-2 active:brightness-200"
					type="submit"
					value="Send"
				/>
			</div>
		</div>

		<!-- desktop input -->
		<div class="hidden rounded-md bg-white p-4 md:block md:p-6">
			<div class="flex items-start justify-between gap-6">
				<img
					class="max-w-[2rem]"
					src={$currentUser.image.png.replace('./images', '')}
					alt={`Photo of ${$currentUser.username}`}
				/>
				<textarea
					class="w-full resize-none rounded-md px-4 py-2 outline outline-1 outline-clr-light-gray focus:outline-clr-dark-blue"
					rows="3"
					name="input-comment"
					bind:value={inputComment}
					placeholder="Add a comment..."
					aria-label="Add a comment..."
				/>
				<input
					class="cursor-pointer rounded-md bg-clr-moderate-blue px-8 py-3 font-fw-medium uppercase text-clr-white outline-offset-2 active:brightness-200"
					type="submit"
					value="Send"
				/>
			</div>
		</div>
	</form>
</div>
