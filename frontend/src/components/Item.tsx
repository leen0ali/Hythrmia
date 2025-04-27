import React from 'react';

interface ItemProps {
	id: number,
	header?: string;
	title: string;
	text: string;
	buttonAction?: () => void;
}

const Item: React.FC<ItemProps> = ({ header, title, text, buttonAction, id }) => {
	return (
		<>
			<style>
				{`
					.item-hover {
					  transition: background-color 0.2s ease, transform 0.2s ease;
					}

					.item-hover:hover {
					  background-color: green;
					  transform: translateY(-3px);
					}
			  `}
			</style>

			<div
				onClick={buttonAction}
				className="text-decoration-none"
				style={{ color: 'inherit', display: 'block', width: '40vw' }}
			>
				<div
					className="card item-hover mb-3 px-3 py-2 border rounded-3"
					style={{
						cursor: 'pointer'
					}}
				>
					{header && (
						<div className="fw-semibold text-white mb-2">
							{header} {id}
						</div>
					)}
					<div>
						<h5 className="mb-2 text-white">{title}</h5>
						<p className="mb-0 text-white">{text}</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Item;

