import React, {useEffect,useState} from 'react'
import { Box, Typography } from "@mui/material";
import { getAllMovies } from '../../api-helpers/api-helpers';
import MovieItem from './MovieItem';


const Movies = () => {

  const [movies,setMovies]=useState();
  useEffect(() => {
    getAllMovies()
      .then((data) => {
        console.log('Fetched Movies:', data.movies); // Debug log
        setMovies(data.movies);
      })
      .catch((err) => console.log(err));
  }, []);

  return (<Box margin={"auto"} marginTop={4}>
    <Typography 
    variant="h4"
    margin={"auto"} 
    padding={2} 
    width="40%"
      bgcolor={"#900C3F"} 
      textAlign="center"
      color="white"
    >
      All Movies
    </Typography>
    <Box margin={'auto'} marginTop={5} display={'flex'} width={'100%'} justifyContent={'flex-start'} flexWrap={'wrap'}>
    {movies && movies.map((movie) => (
          <MovieItem
            key={movie.id}
            id={movie._id} // Ensure id is passed correctly
            title={movie.title}
            releaseDate={movie.releaseDate}
            posterUrl={movie.posterUrl}
          />
        ))}
    </Box>
  </Box>);
};

export default Movies
