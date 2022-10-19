import React from 'react'

export default function Farm() {
  return (
    <div>
      <div>Farm</div>
      <img src={process.env.PUBLIC_URL + '/assets/img/testFarm.png'} style={{ width:'50%', height:'50%' }}/>
    </div>
  )
}
