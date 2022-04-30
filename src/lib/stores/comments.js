import { writable } from 'svelte/store';
import data from '../data.json';

const commentsData = data.comments;
const currentUserData = data.currentUser;

export const comments = writable(commentsData);
export const currentUser = writable(currentUserData);
