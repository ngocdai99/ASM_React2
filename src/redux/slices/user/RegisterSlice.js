import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const registerThunk = createAsyncThunk('user/register', async (registerRequest, { rejectWithValue }) => {
    try {
        const response = await fetch(
            'https://restapirepo.onrender.com/user/register',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerRequest),
            },
        );


        if (!response.ok) {
            const errorData = await response.json(); 
            return rejectWithValue(errorData);
        }

        return await response.json();
    } catch (err) {
        return rejectWithValue('Không thể kết nối đến máy chủ!');
    }
});


const registerSlice = createSlice({
    name: 'registerSlice',
    initialState: {
        registerResponse: {},
        registerStatus: 'idle',
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(registerThunk.pending, (state, action) => {
                state.registerStatus = 'loading';
            })
            .addCase(registerThunk.fulfilled, (state, action) => {
                state.registerStatus = 'succeeded';
                state.registerResponse = action.payload;
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.registerStatus = 'failed';
                state.loginResponse = action.payload || { message: 'Không thể đăng ký!' };
            });
    },
});


export default registerSlice
export { registerThunk }
