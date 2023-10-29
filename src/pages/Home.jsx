import React from 'react'
import CalendarEvent from '../components/Calendar'

const Home = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h1>BestBuy Calendar Reminder</h1>
        <CalendarEvent />
      </div>
    </>
  );
}

export default Home