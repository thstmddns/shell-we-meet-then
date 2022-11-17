import { Navigate, useParams } from 'react-router-dom';
import Swal from "sweetalert2";

const IsAgree = ({ children }) => {
  const { groupSeq } = useParams()
  const aGroup = JSON.parse(sessionStorage.getItem("group"))
  const correctGroup = aGroup.filter(data => {
    return (data.seq === Number(groupSeq)) && (data.groupMemberAgree === 'Y')
  })
  if (correctGroup.length === 0) {
    Swal.fire({
      icon: "error",
      title: "동의하지 않은 게시물 입니다.",
      text: "동의 후 이용해 주세요.",
    });
  }
  return correctGroup.length === 0 ? <Navigate to='/main' /> : children
}

export default IsAgree;