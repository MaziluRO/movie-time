import { useRef } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

const MovieFinder = ({ isLoading, genres, getMovie }) => {
	const genreRef = useRef();

	const submitFormHandler = (e) => {
		e.preventDefault();
		getMovie(genreRef.current.value);
	};

	return (
		<>
			<form action='#' id='genreForm' onSubmit={submitFormHandler}>
				<label>Choose a genre:</label>
				<select name='genres' id='genres' ref={genreRef}>
					{genres.length > 0 &&
						genres.map((genre) => (
							<option key={genre.id} value={genre.id}>
								{genre.name}
							</option>
						))}
				</select>
				<button id='playBtn' type='Submit'>
					Find Movie
				</button>
			</form>
		</>
	);
};

export default MovieFinder;
