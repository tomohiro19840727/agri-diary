import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { db, storage } from '../firebase';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';

const CurrentYearCalendar = ({ postList, formattedDate2, setFormattedDate2 }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [content, setContent ] = useState([]);
  const [singleImage, setSingleImage] = useState('');

  const handleImage = (e) => {
   e.preventDefault();
   let pickedFile;
   if(e.target.files && e.target.files.length > 0 ) {
    pickedFile = e.target.files[0];
    setSingleImage(pickedFile);
   } 
  }

  const handleChange = (e) => {
    setContent(e.target.value)
   }

  const createPost = async (e) => {
    e.preventDefault();
    const imageRef = ref(storage, `images/${singleImage.name}`);
    uploadBytes(imageRef, singleImage).then((res) => {
      alert(`投稿に成功しました`);
      getDownloadURL(imageRef).then((imageUrl) => {
        addDoc(collection(db, "posts"), {
          content: content, //文字列
          createdAt: formattedDate,//文字列
          imgUrl: imageUrl,
        });
      })
    })
   setContent("");
  }; 

  const formattedDate = `${currentDate.getFullYear()}-${(
    currentDate.getMonth() + 1
  ).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

  const prevDay = () => {
    let prevDate;

    if (formattedDate2) {
      // カレンダーをタップして得られる日付がある場合
      prevDate = new Date(formattedDate2);
    } else {
      // 通常の日付
      prevDate = new Date(currentDate);
    }

    // const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 1);
    setCurrentDate(prevDate);
    updateFormattedDate(prevDate);
  };  

  const nextDay = () => {
    let nextDate;

    if (formattedDate2) {
      // カレンダーをタップして得られる日付がある場合
      nextDate = new Date(formattedDate2);
    } else {
      // 通常の日付
      nextDate = new Date(currentDate);
    }

    // const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);
    setCurrentDate(nextDate);
    updateFormattedDate(nextDate);
  };

  // 日付が変更されたときに実行される useEffect
  useEffect(() => {
    updateGreeting();
  }, [currentDate]);

  const updateFormattedDate = (date) => {
    const formattedDate = `${date.getFullYear()}-${(
      date.getMonth() + 1
    ).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    // 新しいフォーマットされた日付で状態を更新
    setFormattedDate2(formattedDate);
  };

  

  const updateGreeting = () => {
    // ここで日付と年に対応するメッセージを設定
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
  };

   console.log(formattedDate);

  //  const filteredPosts = postList.filter((post) => post.createdAt === formattedDate);
  const filteredPosts = postList.filter((post) => post.createdAt === formattedDate || post.createdAt === formattedDate2);


  return (
    <>
    <h1>{formattedDate2}</h1>
    <div className="container mx-auto mt-8 text-center">
      <div className="flex justify-center items-center mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded"
          onClick={prevDay}
          >
          前日
        </button>
        {/* <p className="text-2xl">{formattedDate}</p> */}
        <p className="text-2xl">{formattedDate2 || formattedDate}</p>

      
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 ml-4 rounded"
          onClick={nextDay}
          >
          翌日
        </button>
      </div>

     <form onSubmit={createPost}>
      <textarea  value={content} placeholder="内容を記入してください" onChange={handleChange}/>
      <input type="file"  accept="png, .jpeg, .jpg, .HEIC" onChange={handleImage} />
    <button type="submit">保存</button>
     </form>
    </div>

      {filteredPosts.map((post) => (
        <div key={post.id}>
        <h4>{post.content}</h4>
         {post.weather && (
      <>
        <h3>{post.weather.city}</h3>
        <h3>{post.weather.temperature}</h3>
      </>
    )}

        <img src={post.imgUrl} loading="lazy" alt="Photo by Austin Wade"
        class="w-20 m-5" 
        />
        </div>
      
      ))} 
    </>
  )
}

export default CurrentYearCalendar