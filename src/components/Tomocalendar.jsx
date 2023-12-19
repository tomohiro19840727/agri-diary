import { collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { db } from '../firebase';


const Tomocalendar = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      // Current year
      const postData = await getDocs(query(collection(db, 'posts')));
      setEventData(postData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getData();
  }, []);

  const getFormatDate = (date) => {
    return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
  };

  // 日付の内容を出力
  const getTileContent = ({ date, view }) => {
    // 月表示のときのみ
    if (view !== 'month') {
      return null;
    }

    const day = getFormatDate(date);
    const text = eventData.some((event) => event.createdAt === day) ? '●' : null;

    return (
      <p style={{ textAlign: 'center', margin: 0, fontSize: '0.8em' }}>
        {text}
      </p>
    );
  };


  return (
    <>
      <Calendar
        locale="ja-JP"
        value={date}
        tileContent={getTileContent}
        // onChange={setDate} 
        onChange={(newDate) => {
          setDate(newDate);
          onDateChange(newDate); // 日付が変更されたときに親コンポーネントに通知
        }}
      />
    </>
  );
};

export default Tomocalendar;
