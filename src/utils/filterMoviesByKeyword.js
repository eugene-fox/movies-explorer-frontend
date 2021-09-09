const filterMoviesByKeyword = (movies, searchField, searchQuery) => {
  if (!movies || !searchField || !searchQuery) {
    console.log('тут')
    return;
  }

  console.log('я тут');

  const searchResult = movies.filter(movie => movie[searchField].toLowerCase().includes(searchQuery.toLowerCase()));
  console.log(searchResult);
  return searchResult;
}

export default filterMoviesByKeyword;