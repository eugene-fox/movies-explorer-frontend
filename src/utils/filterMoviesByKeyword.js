const filterMoviesByKeyword = (movies, searchField, searchQuery) => {
  if (!movies || !searchField || !searchQuery) {
    return;
  }
  const searchResult = movies.filter(movie => movie[searchField].toLowerCase().includes(searchQuery.toLowerCase()));
  return searchResult;
}

export default filterMoviesByKeyword;