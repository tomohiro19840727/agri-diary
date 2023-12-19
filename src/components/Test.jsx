import React, { useState } from 'react'
import axios from "axios";


const Test = () => {
  const [text, setText ] = useState("");
 
  const handleButton = async () => {
   try {
    const functionURL = "https://us-central1-agri-diary-2361e.cloudfunctions.net/helloWorld"

    const response = await axios.get(functionURL);
    setText(response.data);
   } catch (error) {
    console.error("エラーだよ", error)
   }
  }

  return (
    <div>
      <button onClick={handleButton}>ボタン</button>
      <div>{text}</div>
    </div>
  );
};

export default Test