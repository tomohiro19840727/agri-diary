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
<div class="bg-white py-6 sm:py-8 lg:py-12">
  <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
    <div class="flex overflow-hidden rounded-lg bg-gray-100">    
      <div class="flex w-full items-center p-4 sm:w-2/3 sm:p-8 lg:w-1/2 lg:pl-10">
        <div class="flex w-full flex-col items-center sm:block">
          <div class="mb-4 sm:mb-8">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded"
          onClick={prevDay}
          >
          前日
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 ml-4 rounded"
          onClick={nextDay}
          >
          翌日
        </button>
            <h2 class="text-center text-xl font-bold text-indigo-500 sm:text-left sm:text-2xl lg:text-3xl">{formattedDate2 || formattedDate}</h2>
            
          </div>

          <form onSubmit={createPost}>
           <div class="mb-3 flex w-full max-w-md gap-2 sm:mb-5">
          <textarea className='' value={content} placeholder="内容を記入してください" onChange={handleChange} class="w-full"/>
            </div> 
           <div class="mb-3 flex w-full max-w-md gap-2 sm:mb-5">
            <input placeholder="Email" class="bg-gray-white w-full flex-1 rounded border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-400 outline-none ring-indigo-300 transition duration-100 focus:ring" type="file"  accept="png, .jpeg, .jpg, .HEIC" onChange={handleImage} />
            <button class="rounded bg-indigo-500 px-8 py-2 text-center text-sm font-semibold text-white"  type="submit">保存</button>
            </div>      
          </form>
        </div>
      </div>
        {filteredPosts.map((post) => (
        <div key={post.id} className=''>
        <h4 className=''>{post.content}</h4>
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
    </div>
  </div>
</div>
    </>
  )
}

export default CurrentYearCalendar