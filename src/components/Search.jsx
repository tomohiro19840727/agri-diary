import React, { useState } from 'react';


function Search({ postList, lastpostList, twolastpostList }) {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    const lists = [postList, lastpostList, twolastpostList];

     const results = lists.flatMap((list) => 
     list.filter((doc) => doc.content.toLowerCase().includes(searchText.toLowerCase())
     )
     );
     console.log(results);
     setSearchResults(results);
  };


  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search"
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        {searchResults.map((result) => (
          <div key={result.id}>{result.content}</div>
        ))}
      </div>
    </div>
  );
}

export default Search;
