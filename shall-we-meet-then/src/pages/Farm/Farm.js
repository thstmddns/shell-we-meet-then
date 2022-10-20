import React, {useEffect, useState} from 'react'
import farmCss1 from './Farm.css'


export default function Farm() {

  // 트리를위한 매핑
  const [treeState, setTreeState] = useState([false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false])

  // 더미데이터 나중에 백에서 받아올 그룹모음
  const testlist = [{groupSeq:1},{groupSeq:2},{groupSeq:2}, {groupSeq:2}, {groupSeq:2}, {groupSeq:2},{groupSeq:2},{groupSeq:2},{groupSeq:2},{groupSeq:2},{groupSeq:2},{groupSeq:2},{groupSeq:2},{groupSeq:2},{groupSeq:2},{groupSeq:2},{groupSeq:2},{groupSeq:2},{groupSeq:2},{groupSeq:2}]

  const [temp, setTemp] = useState(0)

  // 그룹세어서 넣기
  const checktree = () => {
    let newTreeState = [...treeState];
    
    // 시작점
    for(let i = 0 + temp * 20 ; i < testlist.length; i++){

      newTreeState[i] = true;
    }
    setTreeState(newTreeState)

    
  }

 

  useEffect(()=> {
    checktree()
  },[])

  return (
    <div className='farmBody'>
      <div>
        <img className='field' src={process.env.PUBLIC_URL + '/assets/img/testFarm.png'}/>
        {treeState[0] === true ? <img className='tree0' src={process.env.PUBLIC_URL + '/assets/img/tree.png'} /> : <></>}
        {treeState[1] === true ? <img className='tree1' src={process.env.PUBLIC_URL + '/assets/img/tree.png'} /> : <></>}
        {treeState[2] === true ? <img className='tree2' src={process.env.PUBLIC_URL + '/assets/img/tree.png'} /> : <></>}
        {treeState[3] === true ? <img className='tree3' src={process.env.PUBLIC_URL + '/assets/img/tree.png'} /> : <></>}
        {treeState[4] === true ? <img className='tree4' src={process.env.PUBLIC_URL + '/assets/img/tree.png'} /> : <></>}
        {/* {treeState[5] === true ? <img className='tree5' src={process.env.PUBLIC_URL + '/assets/img/tree.png'} /> : <></>}
        {treeState[6] === true ? <img className='tree6' src={process.env.PUBLIC_URL + '/assets/img/tree.png'} /> : <></>}
        {treeState[7] === true ? <img className='tree7' src={process.env.PUBLIC_URL + '/assets/img/tree.png'} /> : <></>}
        {treeState[8] === true ? <img className='tree8' src={process.env.PUBLIC_URL + '/assets/img/tree.png'} /> : <></>}
        {treeState[9] === true ? <img className='tree9' src={process.env.PUBLIC_URL + '/assets/img/tree.png'} /> : <></>}
        {treeState[10] === true ? <img className='tree10' src={process.env.PUBLIC_URL + '/assets/img/tree.png'} /> : <></>}
        {treeState[11] === true ? <img className='tree11' src={process.env.PUBLIC_URL + '/assets/img/tree.png'} /> : <></>}
        {treeState[12] === true ? <img className='tree12' src={process.env.PUBLIC_URL + '/assets/img/tree.png'} /> : <></>}
        {treeState[13] === true ? <img className='tree13' src={process.env.PUBLIC_URL + '/assets/img/tree.png'} /> : <></>}
        {treeState[14] === true ? <img className='tree14' src={process.env.PUBLIC_URL + '/assets/img/tree.png'} /> : <></>}
        {treeState[15] === true ? <img className='tree15' src={process.env.PUBLIC_URL + '/assets/img/tree.png'} /> : <></>}
        {treeState[16] === true ? <img className='tree16' src={process.env.PUBLIC_URL + '/assets/img/tree.png'} /> : <></>}
        {treeState[17] === true ? <img className='tree17' src={process.env.PUBLIC_URL + '/assets/img/tree.png'} /> : <></>}
        {treeState[18] === true ? <img className='tree18' src={process.env.PUBLIC_URL + '/assets/img/tree.png'} /> : <></>}
        {treeState[19] === true ? <img className='tree19' src={process.env.PUBLIC_URL + '/assets/img/tree.png'} /> : <></>} */}
        {/* <button>></button> */}
    
      </div>
    </div>
  )
}
