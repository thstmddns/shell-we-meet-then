const isLogin = () => !!sessionStorage.getItem("accessToken")
export default isLogin;