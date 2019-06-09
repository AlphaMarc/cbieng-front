import { Signal } from "micro-signals";
import { useEffect, useState } from "react";

export const useChangingValue = <T>(initialValue: T, changeSignal: Signal<T>, deps: any[]) => {
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		const updateValue = (v: T) => setValue(v);
		changeSignal.add(updateValue);
		return () => changeSignal.remove(updateValue);
	}, deps);

	return value;
};
