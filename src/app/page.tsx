'use client';

import Header from '@/components/Header';
import TaskWrapper from '@/components/TaskWrapper';
import TaskProvider from '@/contexts/useTask';

export default function Home() {
	return (
		<TaskProvider>
			<Header />
			<TaskWrapper />
		</TaskProvider>
	);
}
