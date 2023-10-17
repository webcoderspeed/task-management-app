import { useTask } from '@/contexts/useTask';
import classNames from 'classnames';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TaskFilter = ({
	setFilteredTasks,
}: {
	setFilteredTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}) => {
	const { tasks } = useTask();

	const statuses = ['all', 'pending', 'inprogress', 'completed'];

	const statusClasses = (status: string) =>
		classNames('px-4 py-2 rounded-md capitalize cursor-pointer ', {
			'bg-emerald-500 text-white': status === 'completed',
			'bg-blue-500 text-white': status === 'inprogress',
			'bg-gray-900 text-white': status === 'pending',
			'bg-white-400 border border-black': status === 'all',
		});

	function handleFilterTask(status: string) {
		const filteredTasks = [...tasks].filter((task) => {
			return status === 'all' || task.status === status;
		});
		setFilteredTasks(filteredTasks);
	}

	return (
		<motion.div
			initial={{ x: -50, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			transition={{ type: 'spring', damping: 10 }}
			className='flex items-center gap-3 justify-center mb-6'
		>
			{statuses.map((status) => (
				<span
					className={statusClasses(status)}
					key={status}
					onClick={() => handleFilterTask(status as ITask['status'])}
				>
					{status}
				</span>
			))}
		</motion.div>
	);
};

export default TaskFilter;
