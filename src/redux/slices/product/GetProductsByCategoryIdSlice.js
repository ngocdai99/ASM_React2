import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';



export const getProductsByCategoryIdThunk = createAsyncThunk(
    'productsByCategory/fetch',
    async (categoryId, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://restapirepo.onrender.com/product/list/category/${categoryId}`);
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


const getProductsByCategoryIdSlice = createSlice({
    name: 'getProductsByCategoryIdSlice',
    initialState: {
        getProductsByCategoryIdResponse: {},
        getProductsByCategoryIdStatus: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductsByCategoryIdThunk.pending, (state) => {
                state.getProductsByCategoryIdStatus = 'loading';
            })
            .addCase(getProductsByCategoryIdThunk.fulfilled, (state, action) => {
                state.getProductsByCategoryIdStatus = 'succeeded';
                state.getProductsByCategoryIdResponse = action.payload;
            })
            .addCase(getProductsByCategoryIdThunk.rejected, (state, action) => {
                state.getProductsByCategoryIdStatus = 'failed';
                state.getProductsByCategoryIdResponse = action.payload || { message: 'Không thể tải products!' };
            });
    },
});


export default getProductsByCategoryIdSlice
export { getProductsByCategoryIdThunk }
