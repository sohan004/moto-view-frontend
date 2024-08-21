import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setLoading, setUser } from "../features/authUser/authUserSlice"
import useAxios from "./useAxios"

const useAutoLogin = () => {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const axios = useAxios()

  useEffect(() => {
    const timeOut = setTimeout(async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token || user) dispatch(setLoading(false))
        if (token) {
          dispatch(setLoading(true))
          const { data } = await axios.get('/auth/auto-login')
          dispatch(setUser(data.info))
        }
      } catch (error) {
        console.log(error);
        dispatch(setLoading(false))
      }
    }, 1);
    return () => clearTimeout(timeOut)
  }, [])
}

export default useAutoLogin;