import { useState, useEffect, useMemo } from 'react';

// Custom hook for managing data in localStorage
function useLocalStorage<T>(key: string, initialValue: T) {
	// Set up state to store the current value
	const [value, setValue] = useState<T>(initialValue);

	// Update localStorage when the value changes
	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	useEffect(() => {
		// Retrieve data from localStorage when the component mounts
		const storedValue = localStorage.getItem(key);
		const initial = storedValue ? JSON.parse(storedValue) : initialValue;
		setValue(initial);
	}, [key, initialValue]);

	return [value, setValue] as const;
}

export default useLocalStorage;
