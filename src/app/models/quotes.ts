export type Quote = {
	id?: string;
	author: string;
	text: string;
	source?: string;
	tags?: string[] | string;
	createdBy?: string;
	createdAt?: string;
	updatedAt?: string;
	isDeleted?: boolean | false;
};
