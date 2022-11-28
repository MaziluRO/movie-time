import React from 'react';

const MovieInfo = ({ movie }) => {
	return (
		<div id='movieInfo'>
			<div id='moviePoster'>
				<img
					src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
					alt='Movie Poster'
					id='moviePoster'
				/>
			</div>
			<h2>{movie.title}</h2>
			<div id='movieText'>
				<p>{movie.overview}</p>
			</div>
		</div>
	);
};

export default MovieInfo;
