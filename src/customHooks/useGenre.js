const useGenre = (selectedGenres) =>{
    if(selectedGenres.length < 1) return '';

    else {
        const GenreId = selectedGenres.map(genre => genre.id);
        console.log("Genre Id: ", GenreId)
        return GenreId.reduce(function (acc, curr) { 
            console.log("Acc: ", acc + "," , "Current: ", curr);
            return acc + ',' + curr;
        });
    }
}

export default useGenre;