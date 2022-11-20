import React from 'react';

const Loading = () => {
    return (
			<div className="">
				<div className="flex justify-center items-center h-screen">
					<div
						className="spinner-border animate-spin inline-block w-16 h-16 border-4 border-l-fuchsia-400 rounded-full"
						role="status">
						<span className="visually-hidden"></span>
					</div>
				</div>
			</div>
		);
};

export default Loading;