import { useTask } from '@/contexts/useTask';
import React, { useState } from 'react';

interface EditTaskFormProps {
	task: ITask;
	handleClose: () => void;
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({ task, handleClose }) => {
	const { handleUpdateTask } = useTask();

	const [editedTask, setEditedTask] = useState<ITask>(task);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleUpdateTask(editedTask);
		handleClose();
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='p-4 bg-white rounded-lg shadow-md'
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
					value={editedTask.title}
					onChange={(e) =>
						setEditedTask({ ...editedTask, title: e.target.value })
					}
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
					value={editedTask.description}
					onChange={(e) =>
						setEditedTask({ ...editedTask, description: e.target.value })
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
					value={new Date(editedTask.deadline).toISOString().split('T')[0]}
					onChange={(e) =>
						setEditedTask({ ...editedTask, deadline: new Date(e.target.value) })
					}
					className='w-full p-2 border rounded-md'
				/>
			</div>
			<button
				type='submit'
				className='bg-blue-500 text-white p-2 rounded-md'
			>
				Update Task
			</button>
		</form>
	);
};

export default EditTaskForm;
