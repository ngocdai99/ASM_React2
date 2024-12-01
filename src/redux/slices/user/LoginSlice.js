import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import MyAsyncStorage from '../../../utils/MyAsyncStorage';
import KEY_NAMES from '../../../utils/keyname';


export const loginThunk = createAsyncThunk('user/login', async (loginRequest, { rejectWithValue }) => {
    try {
        const response = await fetch(
            'https://restapirepo.onrender.com/user/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginRequest),
            },
        );


        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        const userData = await response.json();

        await MyAsyncStorage.storeData(KEY_NAMES.USER, userData.userDetail)
        return userData;
    } catch (err) {
        return rejectWithValue('Không thể kết nối đến máy chủ!');
    }
});


const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: {
        loginResponse: {},
        loginStatus: 'idle',
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loginThunk.pending, (state, action) => {
                state.loginStatus = 'loading';
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loginStatus = 'succeeded';
                state.loginResponse = action.payload;
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loginStatus = 'failed';
                state.loginResponse = action.payload || { message: 'Không thể đăng nhập!' };
            });
    },
});


export default loginSlice
export { loginThunk }
