import { useEffect, useState } from 'react';
import { useIsomorphicLayoutEffect as useLayoutEffect } from '@react-lit/helper';

let serverHandoffComplete = false;
let id = 0;

/**
 * Auto-increment a global integer that facilitates as an ID.
 * @returns {number}
 */
function genId() {
	return ++id;
}

/**
 * useId autogenerates IDs to facilitate WAI-ARIA and server rendering.
 * NOTE(joel): The returned ID will initially be `null` and will update after
 * the component mounts. Users may need to supply their own ID if they need
 * consistent values for SSR.
 * @param {string} [parentId]
 * @returns {string | undefined}
 */
export function useId(parentId) {
	// NOTE(joel): If this instance isn't part of the initial render, we don't
	// have to do the double render/patch-up dance. We can just generate the ID
	// and return it.
	const initialId = parentId || (serverHandoffComplete ? genId() : null);

	const [id, setId] = useState(initialId);

	useLayoutEffect(() => {
		if (id === null) {
			setId(genId());
		}
	}, [id]);

	useEffect(() => {
		if (serverHandoffComplete === false) {
			// NOTE(joel): Flag all future uses of `useId` to skip the update dance.
			// This is in `useEffect` because it goes after `useLayoutEffect`,
			// ensuring we don't accidentally bail out of the patch-up dance
			// prematurely.
			serverHandoffComplete = true;
		}
	}, []);

	return id != null ? String(id) : undefined;
}
