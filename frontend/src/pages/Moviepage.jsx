import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import { useState } from 'react'
import { Bookmark } from "lucide-react";
import { Play } from "lucide-react";


const Moviepage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjc1ZGNjNzQ5NzZhMDRkOWU2YmY1MzM5ZTYxYzhiZSIsIm5iZiI6MTc4MjMwMjU0OS43MSwic3ViIjoiNmEzYmM3NTVkOGJjMTJmOGJjN2Y5ODkyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.bOCu8TJEHrst71LB3Ek0lFHtwfGKJpXvlLsXHPaqFj4'
        }
    };
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
            .then(res => res.json())
            .then(res => setMovie(res))
            .catch(err => console.error(err));
    }, [id]);

    if (!movie) {
        return <div className='flex items-center justify-center h-screen'>
            <span className='text-xl text-red-500'>Loading...</span>
        </div>
    }


    return (
        <div className='min-h-screen-[#181818] text-white'>
            <div className='relative h-[60vh] flex items-end' style={
                {
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }
            }>
                <div className='absolute inset-0 bg-gradient-to-t from-[#181818] 
                via-transperent to-transparent'></div>

                <div className='relative z-10 flex items-end p-8 gap-8'>
                    <img
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        className='rounde-lg shadow-lg w-48 hidden md:block'
                    />

                    <div>
                        <h1 className='text-4xl font-bold mb-2'>{movie.title}</h1>
                        <div className='flex items-center gap-4 mb-2'>
                            <span>
                                ⭐{movie.vote_average.toFixed(1)}
                            </span>
                            <span>
                                {movie.release_date}
                            </span>
                            <span>
                                {movie.runtime} min
                            </span>
                        </div>
                        <div className='flex flex-wrap gap-2 mb-4'>
                            {movie.genres.map((genre) => (
                                <span className='bg-gray-800 px-3 py-1 rounded-full text-sm'>
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                        <p className='max-w-2xl text-gray-200'>{movie.overview}</p>
                        <button
                            className="flex justify-center items-center bg-[#e50914] hover:bg-gray-200 text-white py-3 px-4 rounded-full 
                                cursor-pointer text-sm md:text-base mt-2 md:mt-4"
                        >
                            <Play className="mr-2 w-4 h-5 md:w-5 md:h-5" />
                            Watch Now
                        </button>
                    </div>

                </div>
            </div>
            <div className='p-8'>
                    <h2 className='text-2xl font-semibold mb-4'>Details</h2>
                    <div className='bg-[#232323] rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-8'>
                        <div className='flex-1'>
                            <ul className="text-gray-300 space-y-3">
                                <li>
                                    <span className='font-semibold text-white'>Status: </span>
                                    <span className='ml-2'>{movie.status}</span>
                                </li>
                                <li>
                                    <span className='font-semibold text-white'>Release Date: </span>
                                    <span className='ml-2'>{movie.release_date}</span>
                                </li>
                                <li>
                                    <span className='font-semibold text-white'>Original language: </span>
                                    <span className='ml-2'>{movie.original_language?.toUpperCase()}</span>
                                </li>
                                <li>
                                    <span className='font-semibold text-white'>Budget: </span>
                                    <span className='ml-2'>{movie.budget ? `$${movie.budget.toLocaleString()}` : 'N/A'}</span>
                                </li>
                                <li>
                                    <span className='font-semibold text-white'>Revenue: </span>
                                    <span className='ml-2'>{movie.revenue ? `$${movie.revenue.toLocaleString()}` : 'N/A'}</span>
                                </li>
                                <li>
                                    <span className='font-semibold text-white'>Production Companies: </span>
                                    <span className='ml-2'>{movie.production_companies && movie.production_companies.length > 0 ? movie.production_companies.map((c) => c.name).join(', ') : 'N/A'}</span>
                                </li>
                                <li>
                                    <span className='font-semibold text-white'>Countries: </span>
                                    <span className='ml-2'>{movie.production_countries && movie.production_countries.length > 0 ? movie.production_countries.map((c) => c.name).join(', ') : 'N/A'}</span>
                                </li>
                                <li>
                                    <span className='font-semibold text-white'>Spoken Languages: </span>
                                    <span className='ml-2'>{movie.spoken_languages && movie.spoken_languages.length > 0 ? movie.spoken_languages.map((l) => l.name).join(', ') : 'N/A'}</span>
                                </li>
                            </ul>
                        </div>
                        <div className='flex-1'>
                            <h3>Tagline</h3>
                            <p>{movie.tagline || "No tagline available."}</p>
                        </div>
                    </div>
            </div>
        </div>
    )
};

export default Moviepage
