import { collection, getDocs, query } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';


function Search() {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(query(collection(db, 'posts')));
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  },[]);

  const handleSearch = async () => {
    const results = postList.filter((doc) =>
    doc.content.toLowerCase().includes(searchText.toLowerCase())
  );
  console.log(results)
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
