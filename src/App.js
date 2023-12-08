import React from 'react'
import CurrentYearCalendar from './components/CurrentYearCalendar'
import LastYearCalendar from './components/LastYearCalendar'
import TwoYearsAgoCalendar from './components/TwoYearsAgoCalendar'

const App = () => {
  return (
    <>
    <CurrentYearCalendar />
    <LastYearCalendar />
    <TwoYearsAgoCalendar />
    </>

  )
}

export default App