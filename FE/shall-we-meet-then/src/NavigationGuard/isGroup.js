import { Navigate, useParams } from 'react-router-dom';
import Swal from "sweetalert2";

const IsGroup = ({ children }) => {
  const { groupSeq } = useParams()
  const cGroup = JSON.parse(sessionStorage.getItem("group"))
  const correctGroup = cGroup.filter(data => {
    return data.seq === Number(groupSeq)
  })
  if (correctGroup.length === 0) {
    Swal.fire({
      icon: "error",
      title: "잘못된 경로입니다.",
      text: "제대로된 경로로 들어가주세요.",
    });
  }
  return correctGroup.length === 0 ? <Navigate to='/main' /> : children
}

export default IsGroup;