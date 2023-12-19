import React, { useEffect, useState } from 'react'
import CurrentYearCalendar from './components/CurrentYearCalendar'
import LastYearCalendar from './components/LastYearCalendar'
import TwoYearsAgoCalendar from './components/TwoYearsAgoCalendar'
import Header from './components/Header'
import Search from './components/Search'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from './firebase'
import Test from './components/Test'

const App = () => {
  const [postList, setPostList] = useState([]);
  const [lastpostList, setLastPostList] = useState([]);
  const [twolastpostList, setTwoLastPostList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      // Current year
      const postData = await getDocs(query(collection(db, 'posts')));
      setPostList(postData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

      // Last year
      const lastPostData = await getDocs(query(collection(db, 'lastposts')));
      setLastPostList(lastPostData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

      // Two years ago
      const twoLastPostData = await getDocs(query(collection(db, 'twolastyearsposts')));
      setTwoLastPostList(twoLastPostData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getData();
  }, []);

  return (
    <>
      <Header />
      <CurrentYearCalendar postList={postList} />
      <LastYearCalendar lastpostList={lastpostList} />
      <TwoYearsAgoCalendar twolastpostList={twolastpostList} />
      <Search postList={postList} lastpostList={lastpostList} twolastpostList={twolastpostList} />
      <Test />
    </>
  )
}

export default App
