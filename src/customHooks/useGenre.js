const useGenre = (selectedGenres) =>{
    if(selectedGenres.length < 1) return '';

    else {
        const GenreId = selectedGenres.map(genre => genre.id);
        return GenreId.reduce(function (acc, curr) { 
            return acc + ',' + curr;
        });
    }
}

export default useGenre;