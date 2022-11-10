import React from 'react'
import styled from 'styled-components'


export const ShiningContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 9vh;
`

export const ShiningComponent = styled.div`
  width: 75rem;
  height: 39rem;
  border-radius: 3rem;
  box-shadow: 0.2rem 0.2rem 1.2rem var(--pink), -0.2rem -0.2rem 1.2rem var(--pink);
  padding: 4rem;
  display: grid;
  grid-template-columns: 17.6rem 19rem 20.4rem;
  grid-template-rows: repeat(autofit, -webkit-min-content);
  grid-template-rows: repeat(autofit, min-content);
  grid-column-gap: 5rem;
  grid-row-gap: 2.5rem;
  align-items: center;

  margin-top: 6vh;
  margin-bottom: 50vh;

`

export const ShiningClock = styled.div`
    grid-column: 2/3;
    grid-row: 1/3;
    width: 32rem;
    height: 32rem;
    justify-self: center;
    box-shadow: 0.3rem 0.3rem 0.6rem var(--greyLight-2), -0.2rem -0.2rem 0.5rem var(--white);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    align-items: center;

    margin-top:-5vh;
    margin-bottom: 60h;

`