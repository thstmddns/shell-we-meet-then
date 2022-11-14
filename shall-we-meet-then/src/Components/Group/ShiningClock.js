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

    /*  play button */
    const play = document.querySelector(".play");
    const pause = document.querySelector(".pause");
    const playBtn = document.querySelector(".circle__btn");
    const wave1 = document.querySelector(".circle__back-1");
    const wave2 = document.querySelector(".circle__back-2");

    /*  rate slider */
    const container = document.querySelector(".slider__box");
    const btn = document.querySelector(".slider__btn");
    const color = document.querySelector(".slider__color");
    const tooltip = document.querySelector(".slider__tooltip");

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
      <div class="clock">
        <div class="hand hours"></div>
        <div class="hand minutes"></div>
        <div class="hand seconds"></div>
        <div class="point"></div>
        <div class="marker">
          <span class="marker__1"></span>
          <span class="marker__2"></span>
          <span class="marker__3"></span>
          <span class="marker__4"></span>
        </div>
      </div>
    </>
  );
}

export default ShiningClock;
