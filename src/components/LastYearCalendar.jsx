import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { db, storage } from '../firebase';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';

const LastYearCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [postList, setPostList] = useState([]);
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
    const imageRef = ref(storage, `lastimages/${singleImage.name}`);
    uploadBytes(imageRef, singleImage).then((res) => {
      alert(`投稿に成功しました`);
      getDownloadURL(imageRef).then((imageUrl) => {
        addDoc(collection(db, "lastposts"), {
          content: content, //文字列
          createdAt: formattedDate,//文字列
          imgUrl: imageUrl,
        });
      })
    })
   setContent("");
  }; 

  const formattedDate = `${currentDate.getFullYear() - 1 }-${(
    currentDate.getMonth() + 1
  ).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

  const prevDay = () => {
    const prevDate = new Date(currentDate);
    prevDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(prevDate);
  };

  const nextDay = () => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(nextDate);
  };

  // 日付が変更されたときに実行される useEffect
  useEffect(() => {
    updateGreeting();
  }, [currentDate]);

  const updateGreeting = () => {
    // ここで日付と年に対応するメッセージを設定
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(query(collection(db, 'lastposts')));
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  },[]);

   console.log(formattedDate);
   const filteredPosts = postList.filter((post) => post.createdAt === formattedDate);

  return (
    <>
    <div className="container mx-auto mt-8 text-center">
      <h1 className="text-4xl font-bold mb-4">去年だよ</h1>
      <div className="flex justify-center items-center mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded"
          onClick={prevDay}
          >
          前日
        </button>
        <p className="text-2xl">{formattedDate}</p>
      
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
        <img src={post.imgUrl} loading="lazy" alt="Photo by Austin Wade"
        class="w-20 m-5" 
        />
        </div>
      ))} 

   

    </>
  )
}

export default LastYearCalendar