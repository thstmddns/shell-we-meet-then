import React, { useEffect } from "react";

import "./ShiningClock.css";

function ShiningClock() {
  const rotation = (target, val) => {
    target.style.transform = `rotate(${val}deg)`;
  };

  useEffect(() => {
    /*  clock */
    const hours = document.querySelector(".hours");
    const minutes = document.querySelector(".minutes");
    const seconds = document.querySelector(".seconds");

    const clock = () => {
      let today = new Date();
      let h = (today.getHours() % 12) + today.getMinutes() / 59; // 22 % 12 = 10pm
      let m = today.getMinutes(); // 0 - 59
      let s = today.getSeconds(); // 0 - 59

      h *= 30; // 12 * 30 = 360deg
      m *= 6;
      s *= 6; // 60 * 6 = 360deg

      // rotation = (target, val) => {
      //   target.style.transform =  `rotate(${val}deg)`;
      // }

      rotation(hours, h);
      rotation(minutes, m);
      rotation(seconds, s);

      // call every second
      setTimeout(clock, 500);
    };

    window.onload = clock();
  }, []);

  
  return (
    <>
      <div className="clock">
        <div className="hand hours"></div>
        <div className="hand minutes"></div>
        <div className="hand seconds"></div>
        <div className="point"></div>
        <div className="marker">
          <span className="marker__1"></span>
          <span className="marker__2"></span>
          <span className="marker__3"></span>
          <span className="marker__4"></span>
        </div>
      </div>
    </>
  );
}

export default ShiningClock;
