const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios'); // axiosを追加
admin.initializeApp();

exports.saveWeatherData = functions.pubsub
  .schedule('every day 7:00') 
  .timeZone('Asia/Tokyo') // タイムゾーンの設定
  .onRun(async (context) => {
    try {
      // 本日の日付を指定されたフォーマットで取得
      const today = new Date();
      const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

      // 天気のAPIからデータを取得
      const apiKey = "8d0c3afcfadc43898f541938230812";
      const city = "Rankoshi";
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`); 
      const weatherData = response.data;

      // Firestoreにデータを書き込み
      const docRef = await admin.firestore().collection('posts').add({
        content: 'これはテストです',
        createdAt: formattedDate, // 本日の日付を保存
        weather: {
          city: weatherData.location.name,
          temperature: weatherData.current.temp_c,
          windSpeed: weatherData.current.wind_kph,
          windDirection: weatherData.current.wind_dir,
          iconUrl: weatherData.current.condition.icon,
        },
      });

      console.log('Firestoreにデータを書き込みました。ドキュメントID:', docRef.id);

      return null;
    } catch (error) {
      console.error('Firestoreへのデータ保存エラー:', error);
      return null;
    }
  });
