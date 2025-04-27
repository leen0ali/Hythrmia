import React, { useEffect } from 'react';

interface PopupAlertProps {
	message: string;
	onClose: () => void;
}

const PopupAlert: React.FC<PopupAlertProps> = ({ message, onClose }) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, 5000); // 5 seconds

		return () => clearTimeout(timer); // Cleanup if unmounted
	}, [onClose]);

	if (!message) return null;

	return (
		<div
			className="alert alert-danger position-fixed top-0 start-50 translate-middle-x mt-3"
			role="alert"
			style={{ zIndex: 9999, minWidth: '300px', textAlign: 'center' }}
		>
			{message}
		</div>
	);
};

export default PopupAlert;

