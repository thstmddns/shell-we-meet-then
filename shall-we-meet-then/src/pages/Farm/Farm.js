import React, {useEffect, useState} from 'react'
import farmCss1 from './Farm.css'


export default function Farm() {

  // 트리를위한 매핑
  const [treeState, setTreeState] = useState([false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false])


  const testlist = [{groupSeq:1},{groupSeq:2},{groupSeq:2}]

  const checktree = () => {
    let newTreeState = [...treeState];
    for(let i = 0; i < testlist.length; i++){
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
        {/* <img className='tree2' src={process.env.PUBLIC_URL + '/assets/img/tree.png'} />
        <img className='tree3' src={process.env.PUBLIC_URL + '/assets/img/tree.png'} /> */}
    
      </div>
    </div>
  )
}
