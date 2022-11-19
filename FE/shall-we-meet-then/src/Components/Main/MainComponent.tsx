import '../../pages/Main/Main.css'

export function WritePencilBtn (props: any)  {
    return (
        <>
          <div className="pencil-choice">
            <div className="pencil-img">
              <hgroup className="circle bubble">
                <span className="circle__btn">
                <div className="write-pencil-img">
                  <img
                    alt=""
                    src={
                      process.env.PUBLIC_URL + "/assets/icon-img/write-pencil.png"
                    }
                  />
                  <div className="write-pencil-content">
                  <div onClick={props.goWriteBoard}>글쓰러가기</div>
  
                  </div>
                </div>
                  {/* <img alt="" src={process.env.PUBLIC_URL + "/assets/icon-img/write-pencil.png"} /> */}
                </span>
                <span className="circle__back-1"></span>
                <span className="circle__back-2"></span>
              </hgroup>
            </div>
            </div>
        </>
      )
}

export function NewClockBtn (props:any){
    return (
        <>
          <div>
            <div>
              <hgroup className="circle bubble">
                <span className="circle__btn">
                  <div className="new-clock-img">
                    <img
                      // className="memory-book-img"
                      alt=""
                      src={
                        process.env.PUBLIC_URL + "/assets/icon-img/mini-clock.png"
                      }
                    />
                    <div className="new-clock-content">
                      <div onClick={props.createNewClock}>시계 만들기</div>
                      <br></br>
                      <div onClick={props.joinNewClock}>시계 참여하기</div>
                    </div>
    
                  </div>
                </span>
                <span className="circle__back-1"></span>
                <span className="circle__back-2"></span>
              </hgroup>
            </div>
          </div>
        </>
      )
}


export function MemoryBook (props: any){
    return (
        <>
          <div className="book-choice">
            <div className="book-img">
              <hgroup className="circle bubble">
                <span className="circle__btn">
                  <div className="memory-book-img">
                  <img alt=""
                    src={
                      process.env.PUBLIC_URL + "/assets/icon-img/memory-book-img.png"
                    }
                  />
                  <div className="memory-book-content">
                    <div onClick={props.goMemoryList}>기억 보기</div>
                  </div>
                  </div>
                </span>
                <span className="circle__back-1"></span>
                <span className="circle__back-2"></span>
              </hgroup>
            </div>
          </div>
        </>
      )
}

