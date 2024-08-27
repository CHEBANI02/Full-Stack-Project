import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import {Box, Typography, } from "@mui/material";
import MovieItem from './Movies/MovieItem';
import { Link } from 'react-router-dom';
import { getAllMovies } from '../api-helpers/api-helpers';

const HomePage = () => {

const [movies,setMovies]=  useState([]);
useEffect(() => {
getAllMovies()
.then((data)=> setMovies(data.movies))
.catch(err => console.log(err));
},[]); 
console.log(movies);

  return <Box width={'100%'} height={'100%'} margin={'auto'} marginTop={2}>
    <Box margin={'auto'} width={'80%'} height={'40vh'} padding={2}>
    <img src="https://cms-assets.webediamovies.pro/cdn-cgi/image/dpr=1,fit=scale-down,gravity=auto,metadata=none,quality=85,width=1536/production/241/5534bc700873fae7a971947bf794e55e.jpg" alt="kalki" height={'100%'} width={'100%'} />
          </Box>
<Box padding={5}  margin={'auto'} >
    <Typography variant='h4' textAlign={'center'}>Latest Releases</Typography>
</Box>
<Box display="flex" width="80%" justifyContent={'center'} flexWrap="wrap" margin={'auto'} alignItems="center">
    {movies && movies.map((movie,index) => 
    (<MovieItem 
    id={movie._id}
    title={movie.title}
    posterUrl={movie.posterUrl}
    releaseDate={movie.releaseDate}
    key={index} />))}
</Box>
<Box display={'flex'} padding={5} margin='auto'>
  <Button LinkComponent={Link} to="/movies"  variant="outlined"  sx={{margin:'auto', color:"#2b2d42"}}>
    View All Movies
   
  </Button>
</Box>
  </Box>;
}; 

export default HomePage
