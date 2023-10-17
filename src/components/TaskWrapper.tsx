import { useTask } from '@/contexts/useTask';
import React, { useEffect, useState } from 'react';
import TaskCard from './TaskCard';
import { AnimatePresence } from 'framer-motion';
import TaskFilter from './TaskFilter';
import Modal from './Modal';
import AddTaskForm from './AddTaskForm';

const TaskWrapper = () => {
	const { tasks } = useTask();

	const [filteredTasks, setFilteredTasks] = useState<ITask[]>(tasks);
	const [showAddTaskForm, setShowAddTaskForm] = useState(false);

	useEffect(() => {
		setFilteredTasks(tasks);
	}, [tasks]);

	return (
		<div className='p-4 bg-gray-200 '>
			<Modal
				open={showAddTaskForm}
				handleClose={() => setShowAddTaskForm((prev) => !prev)}
			>
				<AddTaskForm handleClose={() => setShowAddTaskForm((prev) => !prev)} />
			</Modal>

			<TaskFilter {...{ setFilteredTasks }} />
			<div className='w-full flex items-center justify-center mb-4'>
				<button
					className='bg-gray-900 text-white px-6 py-2 rounded-md '
					onClick={() => setShowAddTaskForm((prev) => !prev)}
				>
					Add Task
				</button>
			</div>
			<div className='flex flex-wrap justify-center gap-5 w-full'>
				<AnimatePresence>
					{filteredTasks?.map((task) => (
						<TaskCard
							key={task.id}
							{...{ task }}
						/>
					))}
				</AnimatePresence>
			</div>
		</div>
	);
};

export default TaskWrapper;
