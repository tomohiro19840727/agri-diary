import React from 'react'
import CurrentYearCalendar from './components/CurrentYearCalendar'
import LastYearCalendar from './components/LastYearCalendar'
import TwoYearsAgoCalendar from './components/TwoYearsAgoCalendar'
import Header from './components/Header'

const App = () => {
  return (
    <>
   <Header />
    <CurrentYearCalendar />
    <LastYearCalendar />
    <TwoYearsAgoCalendar />
    </>

  )
}

export default App