import React from 'react'
import CurrentYearCalendar from './components/CurrentYearCalendar'
import LastYearCalendar from './components/LastYearCalendar'
import TwoYearsAgoCalendar from './components/TwoYearsAgoCalendar'
import Header from './components/Header'
import Search from './components/Search'

const App = () => {
  return (
    <>
   <Header />
    <CurrentYearCalendar />
    <LastYearCalendar />
    <TwoYearsAgoCalendar />
    <Search />
    </>

  )
}

export default App