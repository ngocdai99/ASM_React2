import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';



export const getCategoriesThunk = createAsyncThunk(
    'category/list',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('https://restapirepo.onrender.com/category/list');
            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data);
            }

            console.log(data);
            return data;
        } catch (err) {
            return rejectWithValue('Không thể kết nối đến máy chủ!');
        }
    }
);


const getCategoriesSlice = createSlice({
    name: 'getCategoriesSlice',
    initialState: {
        getCategoriesResponse: {},
        getCategoriesStatus: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategoriesThunk.pending, (state) => {
                state.getCategoriesStatus = 'loading';
            })
            .addCase(getCategoriesThunk.fulfilled, (state, action) => {
                state.getCategoriesStatus = 'succeeded';
                state.getCategoriesResponse = action.payload;
            })
            .addCase(getCategoriesThunk.rejected, (state, action) => {
                state.getCategoriesStatus = 'failed';
                state.getCategoriesResponse = action.payload || { message: 'Không thể tải danh mục!' };
            });
    },
});


export default getCategoriesSlice
export { getCategoriesThunk }
