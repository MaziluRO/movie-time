import { useState, useEffect } from 'react';
import Header from './components/Header';
import MovieFinder from './components/MovieFinder';
import MovieInfo from './components/MovieInfo';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

function App() {
	const [movieState, setMovieState] = useState({
		movie: null,
		genres: [],
		isLoading: false,
		displayGenres: false,
	});

	const getMovie = async (selectedGenre) => {
		//const urlToFetch = `https://api.themoviedb.org/3/discover/movie?api_key=ed7bf78f20d9b33d64d482d92fe336ec&with_genres=${selectedGenre}`;
		setMovieState((prev) => {
			return { ...prev, isLoading: true };
		});
		const urlToFetch = `https://api.themoviedb.org/3/discover/movie?api_key=ed7bf78f20d9b33d64d482d92fe336ec&with_genres=${selectedGenre}`;
		try {
			const response = await fetch(urlToFetch);
			if (response.ok) {
				const jsonResponse = await response.json();
				const { results: movies } = jsonResponse;
				const chosenMovie = movies[Math.floor(Math.random() * movies.length)];
				console.log(chosenMovie);
				setMovieState((prev) => {
					return { ...prev, isLoading: false, movie: { ...chosenMovie } };
				});
			} else {
				setMovieState((prev) => {
					return { ...prev, isLoading: false, movieError: true };
				});
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		const getGenres = async () => {
			const urlToFetch =
				'https://api.themoviedb.org/3/genre/movie/list?api_key=ed7bf78f20d9b33d64d482d92fe336ec';

			try {
				const response = await fetch(urlToFetch);
				if (response.ok) {
					const jsonResponse = await response.json();
					const { genres } = jsonResponse;
					setMovieState((prev) => {
						return { ...prev, genres: [...genres], displayGenres: true };
					});
				}
			} catch (err) {
				setMovieState((prev) => {
					return {
						...prev,
						genreLoading: false,
						genreError: true,
						displayGenres: true,
					};
				});
				console.log(err);
			}
		};
		getGenres();
	}, []);

	return (
		<div className='App'>
			<Header />
			{movieState.displayGenres && movieState.genres.length > 0 ? (
				<MovieFinder
					genres={movieState.genres}
					getMovie={getMovie}
				></MovieFinder>
			) : (
				<LoadingSpinner />
			)}
			{movieState.isLoading && <LoadingSpinner></LoadingSpinner>}
			{!movieState.isLoading && movieState.movie && (
				<MovieInfo movie={movieState.movie}></MovieInfo>
			)}
		</div>
	);
}

export default App;
