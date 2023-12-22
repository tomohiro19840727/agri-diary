import React, { useEffect, useState } from 'react';
import CurrentYearCalendar from './components/CurrentYearCalendar';
import LastYearCalendar from './components/LastYearCalendar';
import TwoYearsAgoCalendar from './components/TwoYearsAgoCalendar';
import Header from './components/Header';
import Search from './components/Search';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from './firebase';
import Tomocalendar from './components/Tomocalendar';

const App = () => {
  const [postList, setPostList] = useState([]);
  const [lastpostList, setLastPostList] = useState([]);
  const [twolastpostList, setTwoLastPostList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formattedDate2, setFormattedDate2] = useState(null);
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

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


  useEffect(() => {
    if (selectedDate) {
      const dateStr = getFormattedDate(selectedDate);
      setFormattedDate2(dateStr);
    }
  }, [selectedDate]);

  // 日付を指定された形式にフォーマットする関数
  const getFormattedDate = (date) => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <Header />
      <CurrentYearCalendar postList={postList} formattedDate2={formattedDate2} 
       setFormattedDate2={setFormattedDate2}
      />
      <LastYearCalendar lastpostList={lastpostList} />
      <TwoYearsAgoCalendar twolastpostList={twolastpostList} />
      <Search postList={postList} lastpostList={lastpostList} twolastpostList={twolastpostList} />
      <div>
        <Tomocalendar onDateChange={handleDateChange} />
        {selectedDate && (
          <p style={{ marginTop: '20px' }}>
            選択された日付: {formattedDate2}
          </p>
        )}
      </div>
    </>
  );
};

export default App;
