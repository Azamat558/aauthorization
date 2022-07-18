import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
    'registerUser',
    async function (body) {
        try {
            const response = await axios.post(`https://spooky-nut-production.up.railway.app/auth/signup`, body)
            let res = window.confirm('Пользователь успешно зарегистрирован');
            return res
        } catch (error) {
            alert(error.response.data.message)
        }
    }
);

export const authUser = createAsyncThunk(
    'authUser',
    async function (body) {
        try {
            const response = await axios.post(`https://spooky-nut-production.up.railway.app/auth/signin`, body)
            localStorage.setItem('token', JSON.stringify(response.data.token))
            const url1 = window.location.href
            const url = url1.substring(0,url1.length-5)

            window.location.href=`${url}/table`
        } catch (error) {
            alert(error.response.data.message)
        }
    }
);

export const usersUser = createAsyncThunk(
    'usersUser',
    async function (body) {
        try {
            const token = JSON.parse(localStorage.getItem('token'))
            const response = await axios.get(`https://spooky-nut-production.up.railway.app/users`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data.users
        } catch (error) {
        }
    },
);

export const usersMeUser = createAsyncThunk(
    'usersMeUser',
    async function (body) {
        try {
            const token = JSON.parse(localStorage.getItem('token'))
            const response = await axios.get(`https://spooky-nut-production.up.railway.app/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
        }
    }
);

export const deleteUser = createAsyncThunk(
    'deleteUser',
    async function (id) {
        try {

            const token = JSON.parse(localStorage.getItem('token'))
            const response = await axios.delete(`https://spooky-nut-production.up.railway.app/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
        }
    }
);

export const putUser = createAsyncThunk(
    'putUser',
    async function (body) {
        try {
            const token = JSON.parse(localStorage.getItem('token'))
            const response = await axios.put(`https://spooky-nut-production.up.railway.app/users/${body.id}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLogged: false,
        isSuccess: false,
        users: [],
        usersMe: {},
        isLoading:false

    },

    extraReducers: {
        [registerUser.fulfilled]: (state, action) => {
            state.isSuccess = action.payload
        },

        [authUser.fulfilled]: (state, action) => {
            state.isLogged = action.payload
            state.isLoading = false
        },
        [authUser.pending]: (state, action) => {
            state.isLoading = true
        },
        [authUser.rejected]: (state) => {
            state.isLoading = false
        },

        [usersUser.fulfilled]: (state, action) => {
            state.users = action.payload
        },
        [usersMeUser.fulfilled]: (state, action) => {
            state.usersMe = action.payload
        },
    },
})



export default userSlice