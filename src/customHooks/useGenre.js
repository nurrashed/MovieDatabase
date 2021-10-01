const useGenre = (selectedGenres) =>{
    if(selectedGenres.length < 1) return '';

    else {
        const GenreId = selectedGenres.map(genre => genre.id);
        return GenreId.reduce((acc, curr) => acc + ',' + curr);
    }
}

export default useGenre;