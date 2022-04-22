import * as React from 'react';
import { useId } from '../../src/index';

export function Example() {
	const id = `name-${useId()}`;

	return (
		<>
			<h2>Example: Basic</h2>
			<div>
				<label htmlFor={id} style={{ display: 'block' }}>
					Input
				</label>
				<input type="text" name="example-input" id={id} />
			</div>
		</>
	);
}
