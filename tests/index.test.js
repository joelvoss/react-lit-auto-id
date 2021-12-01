import { render } from './test-utils';

import { useId } from '../src/index';

describe(`useId`, () => {
	it(`should not have ARIA violations`, async () => {
		function Comp() {
			let id = `name-${useId()}`;
			return (
				<div>
					<label htmlFor={id}>Name</label>
					<input name="name" id={id} type="text" />
				</div>
			);
		}
		let { container } = render(<Comp />);
		await expect(container).toHaveNoAxeViolations();
	});

	it('should generate a unique ID', () => {
		function Comp() {
			const id1 = useId(null);
			const id2 = useId();
			return (
				<div>
					<div id={id1}>First</div>
					<div id={id2}>Second</div>
				</div>
			);
		}
		const { getByText } = render(<Comp />);
		const firstId = Number(getByText(/first/i).id);
		const secondId = Number(getByText(/second/i).id);

		expect(firstId).not.toEqual(secondId);
	});

	it('should use the user-provided ID', () => {
		function Comp() {
			const newId = useId('custom-id');
			return <div id={newId}>Element</div>;
		}
		const { getByText } = render(<Comp />);

		expect(getByText(/element/i).id).toEqual('custom-id');
	});
});
