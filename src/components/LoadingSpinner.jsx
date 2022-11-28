import React from 'react';
import loadingSpinner from '../img/icons.svg';

const LoadingSpinner = () => {
	return (
		<div className='spinner'>
			<svg>
				<use href={`${loadingSpinner}#icon-loader`}></use>
			</svg>
		</div>
	);
};

export default LoadingSpinner;
