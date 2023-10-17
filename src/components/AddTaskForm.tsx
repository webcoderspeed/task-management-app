import { useTask } from '@/contexts/useTask';
import React, { useState } from 'react';

const AddTaskForm = ({ handleClose }: { handleClose: () => void }) => {
	const { handleAddTask } = useTask();

	const [newTask, setNewTask] = useState<ITask>({
		id: Math.random(),
		title: '',
		status: 'pending',
		deadline: new Date(),
		description: '',
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Basic validation
		if (!newTask.title.trim()) {
			alert('Title cannot be empty');
			return;
		}

		const dueDate = new Date(newTask.deadline);

		if (isNaN(dueDate.getTime())) {
			alert('Due date is not a valid date');
			return;
		}



		handleAddTask(newTask);
		setNewTask({
			id: Math.random(),
			title: '',
			status: 'pending',
			deadline: new Date(),
			description: '',
		});
		handleClose();
	};

	return (
		<form
			onSubmit={handleSubmit}
		>
			<div className='mb-4'>
				<label
					htmlFor='title'
					className='block text-gray-700 font-bold mb-2'
				>
					Task Title
				</label>
				<input
					type='text'
					id='title'
					value={newTask.title}
					onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
					className='w-full p-2 border rounded-md'
				/>
			</div>
			<div className='mb-4'>
				<label
					htmlFor='description'
					className='block text-gray-700 font-bold mb-2'
				>
					Task Description
				</label>
				<textarea
					id='description'
					value={newTask.description}
					onChange={(e) =>
						setNewTask({ ...newTask, description: e.target.value })
					}
					className='w-full p-2 border rounded-md'
				/>
			</div>
			<div className='mb-4'>
				<label
					htmlFor='deadline'
					className='block text-gray-700 font-bold mb-2'
				>
					Deadline
				</label>
				<input
					type='date'
					id='deadline'
					value={newTask.deadline.toISOString().split('T')[0]}
					onChange={(e) =>
						setNewTask({ ...newTask, deadline: new Date(e.target.value) })
					}
					className='w-full p-2 border rounded-md'
				/>
			</div>
			<button
				type='submit'
				className='bg-blue-500 text-white p-2 rounded-md'
			>
				Add Task
			</button>
		</form>
	);
};

export default AddTaskForm;
