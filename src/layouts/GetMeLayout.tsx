import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { selectUser } from "../redux/user/userSelectors"
import { getMeThunk } from "../redux/user/userThunks"
import { Outlet } from "react-router-dom"

export default function GetMeLayout() {
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectUser)

    useEffect(() => {
        const token = localStorage.getItem("accessToken")

        if(token && !user) {
            dispatch(getMeThunk())
        }
    }, [dispatch, user])

    return <Outlet />
}