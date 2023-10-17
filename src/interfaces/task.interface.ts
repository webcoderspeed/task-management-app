interface ITask {
	id: number;
	title: string;
	status: 'pending' | 'inprogress' | 'completed';
	deadline: Date;
	description: string;
}
