import useLocalStorage from '@/hooks/useLocalStorage';
import { useContext, useState, createContext } from 'react';

const useTaskStore = () => {
	const [task, setTask] = useState<ITask | null>(null);
	const [tasks, setTasks] = useLocalStorage<ITask[]>('tasks', []);
	const [isAddingTask, setIsAddingTask] = useState(false);
	const [isEditingTask, setIsEditingTask] = useState(false);

	return {
		isAddingTask,
		isEditingTask,
		setIsAddingTask,
		setIsEditingTask,
		setTask,
		setTasks,
		task,
		tasks,
	};
};

const TaskContext = createContext<ReturnType<typeof useTaskStore> | null>(null);

const TaskProvider = ({ children }: { children: React.ReactNode }) => {
	const task = useTaskStore();

	return <TaskContext.Provider value={task}>{children}</TaskContext.Provider>;
};

export default TaskProvider;

export const useAuth = () => {
	const task = useContext(TaskContext);
	if (!task) {
		throw new Error('useTask must be used within a TaskProvider');
	}
	return task;
};
