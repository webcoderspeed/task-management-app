import { useRef, ReactNode, useCallback } from 'react';
import { IoClose } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

type ModalProps = {
	open: boolean;
	handleClose: () => void;
	title?: string | ReactNode;
	children: ReactNode;
};

const Modal = ({ open, handleClose, title, children }: ModalProps) => {
	const modalRef = useRef<HTMLDivElement>(null);

	const closeModal = useCallback(() => {
		handleClose();
	}, [handleClose]);

	return (
		<AnimatePresence>
			{open && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='fixed inset-0 flex items-center justify-center z-50 bg-gray-800/80'
				>
					<div
						ref={modalRef}
						className='relative bg-white rounded-md min-w-[200px] border-2 border-indigo-700/60 p-4 max-h-[80vh] overflow-y-auto'
					>
						<div className='flex items-center justify-between gap-5'>
							{title && typeof title === 'string' ? (
								<h2 className='text-lg font-bold mb-4'>{title}</h2>
							) : (
								title
							)}
							{!title && <div />}
							<button
								className='p-1 rounded-md hover:bg-indigo-800/60 bg-indigo-700/60 text-white'
								onClick={closeModal}
							>
								<IoClose className='h-6 w-6' />
							</button>
						</div>
						<div className='my-4'>
							<div>{children}</div>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Modal;
