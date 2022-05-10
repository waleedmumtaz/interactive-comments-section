<script>
	import ReplyComment from '$lib/components/ReplyComment.svelte';
	import { currentUser } from '$lib/stores/comments.js';
	import { deleteComment,downvoteComment,upvoteComment } from '$lib/utils.js';
	import EditComment from './EditComment.svelte';

	export let id, avatar, userName, createdAt, content, score, replyingTo;

	let isReplying,
		isEditing = false;

	let upvotedOnce,
		downvotedOnce = false;
</script>

<div>
	<div class={`${isEditing ? 'hidden' : 'block'} pb-4 md:pb-6`}>
		<div
			class="rounded-md bg-white p-4 md:grid md:grid-cols-12 md:items-start md:justify-start md:gap-6 md:p-6"
		>
			<!-- scores (desktop) -->
			<div
				class="hidden md:flex md:h-fit md:flex-col md:items-center md:justify-start md:rounded-md md:bg-clr-light-gray"
			>
				<!-- plus button -->
				<button
					on:click|preventDefault={() => {
						upvoteComment(id, upvotedOnce);
						upvotedOnce = true;
						downvotedOnce = false;
					}}
					class="px-2 py-4 active:contrast-0"
				>
					<img src="/icon-plus.svg" alt="plus" />
				</button>

				<!-- score -->
				<p class="font-fw-medium text-clr-moderate-blue">{score}</p>

				<!-- minus button -->
				<button
					on:click|preventDefault={() => {
						downvoteComment(id, downvotedOnce);
						downvotedOnce = true;
						upvotedOnce = false;
					}}
					class="px-2 py-4 active:contrast-0"
				>
					<img src="/icon-minus.svg" alt="minus" />
				</button>
			</div>
			<div class="md:col-span-11">
				<div class="flex items-center gap-5 md:justify-between">
					<div class="flex items-center gap-5">
						<!-- avatar -->
						<img class="max-w-[2rem]" src={avatar} alt="Avatar of Amy Robson" />

						<!-- username -->
						<p class="font-fw-medium text-clr-dark-blue">{userName}</p>

						<!-- current user label -->
						{#if userName === $currentUser.username}
							<p class="rounded-sm bg-clr-moderate-blue px-2 pb-0.5 font-fw-medium text-clr-white">
								you
							</p>
						{/if}

						<!-- content created at -->
						<p class="text-clr-grayish-blue">{createdAt}</p>
					</div>

					<!-- buttons (desktop) -->
					<div class="flex items-center gap-6">
						{#if userName === $currentUser.username}
							<!-- delete button (desktop) -->
							<button
								on:click|preventDefault={() => deleteComment(id)}
								class="hidden font-fw-medium text-clr-soft-red outline-offset-8 active:brightness-200 md:flex md:items-center md:gap-2"
							>
								<span>
									<img src="/icon-delete.svg" alt="delete" />
								</span>Delete
							</button>
						{/if}
						{#if userName === $currentUser.username}
							<!-- edit button (desktop) -->
							<button
								on:click|preventDefault={() => (isEditing = true)}
								class="hidden active:brightness-200 md:flex md:items-center md:gap-2 md:font-fw-medium md:text-clr-moderate-blue md:outline-offset-8"
								><span>
									<img src="/icon-edit.svg" alt="edit" />
								</span>Edit
							</button>
						{:else}
							<!-- reply button (desktop) -->
							<button
								on:click|preventDefault={() => (isReplying = true)}
								class="hidden md:flex md:items-center md:gap-2 md:font-fw-medium md:text-clr-moderate-blue md:outline-offset-8 active:brightness-200"
								><span>
									<img src="/icon-reply.svg" alt="reply" />
								</span>Reply
							</button>
						{/if}
					</div>
				</div>

				<!-- content -->
				<p class="py-4 text-clr-grayish-blue md:pb-0">
					<span
						class={`${
							replyingTo === undefined ? 'hidden' : 'font-fw-medium text-clr-moderate-blue'
						}`}>@{replyingTo}</span
					>{' '}{content}
				</p>
				<div class="flex items-center justify-between">
					<!-- scores (mobile) -->
					<div class="flex items-center gap-3 rounded-md bg-clr-light-gray md:hidden">
						<!-- minus button -->
						<button
							on:click|preventDefault={() => {
								downvoteComment(id, downvotedOnce);
								downvotedOnce = true;
								upvotedOnce = false;
							}}
							class="px-2 py-3 active:contrast-0"
						>
							<img src="/icon-minus.svg" alt="minus" />
						</button>

						<!-- score -->
						<p class="font-fw-medium text-clr-moderate-blue">{score}</p>

						<!-- plus button -->
						<button
							on:click|preventDefault={() => {
								upvoteComment(id, upvotedOnce);
								upvotedOnce = true;
								downvotedOnce = false;
							}}
							class="px-2 py-3 active:contrast-0"
						>
							<img src="/icon-plus.svg" alt="plus" />
						</button>
					</div>

					<!-- buttons (mobile) -->
					<div class="flex items-center gap-6">
						{#if userName === $currentUser.username}
							<!-- delete button (mobile) -->
							<button
								on:click|preventDefault={() => deleteComment(id)}
								class="flex items-center gap-2 font-fw-medium text-clr-soft-red outline-offset-8 active:brightness-200 md:hidden"
							>
								<span>
									<img src="/icon-delete.svg" alt="delete" />
								</span>Delete
							</button>
						{/if}
						{#if userName === $currentUser.username}
							<!-- edit button (mobile) -->
							<button
								on:click|preventDefault={() => (isEditing = true)}
								class="flex items-center gap-2 font-fw-medium text-clr-moderate-blue outline-offset-8 active:brightness-200 md:hidden"
								><span>
									<img src="/icon-edit.svg" alt="edit" />
								</span>Edit
							</button>
						{:else}
							<!-- reply button (mobile) -->
							<button
								on:click|preventDefault={() => (isReplying = true)}
								class="flex items-center gap-2 font-fw-medium text-clr-moderate-blue outline-offset-8 md:hidden active:brightness-200"
								><span>
									<img src="/icon-reply.svg" alt="reply" />
								</span>Reply
							</button>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
	{#if isReplying}
		<div>
			<ReplyComment replyId={id} replyingTo={userName} bind:isReplying />
		</div>
	{/if}
	{#if isEditing}
		<EditComment
			{id}
			{avatar}
			{userName}
			{createdAt}
			{content}
			{score}
			{replyingTo}
			bind:isEditing
		/>
	{/if}
</div>
