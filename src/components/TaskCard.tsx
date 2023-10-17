import React, { useState } from 'react';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { IoIosArrowDown } from 'react-icons/io';
import { AiFillDelete } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import classNames from 'classnames';
import { useTask } from '@/contexts/useTask';
import Modal from './Modal';
import EditTaskForm from './EditTaskForm';

dayjs.extend(localizedFormat);

interface TaskCardProps {
	task: ITask;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
	const { handleDeleteTask, handleUpdateTask } = useTask();
	const [showEditTaskForm, setShowEditTaskForm] = useState(false);

	const statusOptions = ['pending', 'inprogress', 'completed'];

	const cardClasses = classNames(
		'rounded-lg p-4 shadow-md w-full my-1 max-w-sm text-white relative',
		{
			'bg-emerald-500 ': task.status === 'completed',
			'bg-blue-500': task.status === 'inprogress',
			'bg-gray-900': task.status === 'pending',
		},
	);

	return (
		<>
			<Modal
				open={showEditTaskForm}
				handleClose={() => setShowEditTaskForm((prev) => !prev)}
			>
				<EditTaskForm
					handleClose={() => setShowEditTaskForm((prev) => !prev)}
					task={task}
				/>
			</Modal>
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				className={cardClasses}
			>
				<div className='flex items-center justify-between gap-5 '>
					<h2 className='text-xl font-semibold'>{task.title}</h2>

					<div className='relative flex'>
						<select
							value={task.status}
							className='block appearance-none text-center bg-white border pr-6 border-gray-300 text-gray-700 py-2 px-4 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-gray-500 uppercase cursor-pointer '
							onChange={(e) =>
								handleUpdateTask({
									...task,
									status: e.target.value as ITask['status'],
								})
							}
						>
							{statusOptions.map((option) => (
								<option
									key={option}
									value={option}
								>
									{option}
								</option>
							))}
						</select>

						<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
							<IoIosArrowDown />
						</div>
					</div>
				</div>

				<p>{task.description}</p>
				<p className=' text-sm mt-2'>{dayjs(task.deadline).format('llll')}</p>

				<div className='flex items-center justify-between mt-4'>
					<div
						className='flex items-center rounded-md gap-2 px-4 py-2 bg-white text-black'
						onClick={() => setShowEditTaskForm((prev) => !prev)}
					>
						<FiEdit /> Edit
					</div>
					<AiFillDelete
						size={24}
						className='text-red-600 cursor-pointer hover:scale-125 transition-all'
						onClick={() => handleDeleteTask(task.id)}
					/>
				</div>
			</motion.div>
		</>
	);
};

export default TaskCard;
