import { comments, currentUser } from '$lib/stores/comments.js';
import { get } from 'svelte/store';

const currentUserAvatar = get(currentUser).image.png;
const currentUserName = get(currentUser).username;

// add new comment
export const addComment = (inputComment) => {
	const newComment = {
		id: Date.now(),
		content: inputComment,
		createdAt: timeSince(Date.now()),
		score: 0,
		user: {
			image: {
				png: currentUserAvatar
			},
			username: currentUserName
		},
		replies: []
	};

	comments.update((comments) => {
		return [...comments, newComment];
	});
};

// delete comment
export const deleteComment = (commentId) => {
	comments.update((comments) => {
		return comments.filter((comment) => {
			const replies = comment.replies;

			if (replies.length > 0) {
				replies.forEach((reply) => {
					if (reply.id === commentId) {
						comment.replies = replies.filter((reply) => reply.id !== commentId);
					}
				});
			}
			return comment.id !== commentId;
		});
	});
};

// reply to a comment
export const replyComment = (replyId, replyingTo, replyComment) => {
	const replyContent = replyComment.replace(`@${replyingTo}`, '');

	const newReply = {
		id: Date.now(),
		content: replyContent,
		createdAt: timeSince(Date.now()),
		score: 0,
		replyingTo: replyingTo,
		user: {
			image: {
				png: currentUserAvatar
			},
			username: currentUserName
		},
		replies: []
	};

	comments.update((comments) => {
		return comments.map((comment) => {
			if (comment.id === replyId) {
				comment.replies = [...comment.replies, newReply];
			}

			return comment;
		});
	});
};

export const timeSince = (date) => {
	let seconds = Math.floor((new Date() - date) / 1000);

	let interval = seconds / 31536000;

	if (interval > 1) {
		return Math.floor(interval) + ' years ago';
	}
	interval = seconds / 2592000;
	if (interval > 1) {
		return Math.floor(interval) + ' months ago';
	}
	interval = seconds / 86400;
	if (interval > 1) {
		return Math.floor(interval) + ' days ago';
	}
	interval = seconds / 3600;
	if (interval > 1) {
		return Math.floor(interval) + ' hours ago';
	}
	interval = seconds / 60;
	if (interval > 1) {
		return Math.floor(interval) + ' minutes ago';
	}

	return Math.floor(seconds) + ' seconds ago';
};
