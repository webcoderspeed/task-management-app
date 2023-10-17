import useLocalStorage from '@/hooks/useLocalStorage';
import { useContext, createContext } from 'react';

function generateRandomDate(): Date {
	const currentDate = new Date();
	const randomDays = Math.floor(Math.random() * 30); // Random due date within 30 days
	const dueDate = new Date(currentDate);
	dueDate.setDate(currentDate.getDate() + randomDays);
	return dueDate;
}

const dummyTasks: ITask[] = [
	{
		id: 1,
		title: 'Task 1',
		status: 'pending',
		deadline: generateRandomDate(),
		description: 'Description for Task 1',
	},
	{
		id: 2,
		title: 'Task 2',
		status: 'inprogress',
		deadline: generateRandomDate(),
		description: 'Description for Task 2',
	},
	{
		id: 3,
		title: 'Task 3',
		status: 'completed',
		deadline: generateRandomDate(),
		description: 'Description for Task 3',
	},
	{
		id: 4,
		title: 'Task 4',
		status: 'inprogress',
		deadline: generateRandomDate(),
		description: 'Description for Task 4',
	},
	{
		id: 5,
		title: 'Task 5',
		status: 'pending',
		deadline: generateRandomDate(),
		description: 'Description for Task 5',
	},
];

const useTaskStore = () => {
	const [tasks, setTasks] = useLocalStorage<ITask[]>('tasks', dummyTasks);

	function handleDeleteTask(id: number) {
		const filteredTasks = tasks.filter((task) => task.id !== id);
		setTasks(filteredTasks);
	}

	function handleUpdateTask(updatedTask: ITask) {
		const updatedTasks = tasks.map((existingTask) => {
			if (existingTask.id === updatedTask.id) {
				return { ...existingTask, ...updatedTask };
			}
			return existingTask;
		});
		setTasks(updatedTasks);
	}

	function handleAddTask(newTask: ITask) {
		const newTasks = [...tasks, newTask];
		setTasks(newTasks);
	}

	return {
		tasks,
		handleDeleteTask,
		handleUpdateTask,
		handleAddTask,
	};
};

const TaskContext = createContext<ReturnType<typeof useTaskStore> | null>(null);

const TaskProvider = ({ children }: { children: React.ReactNode }) => {
	const task = useTaskStore();

	return <TaskContext.Provider value={task}>{children}</TaskContext.Provider>;
};

export default TaskProvider;

export const useTask = () => {
	const task = useContext(TaskContext);
	if (!task) {
		throw new Error('useTask must be used within a TaskProvider');
	}
	return task;
};
