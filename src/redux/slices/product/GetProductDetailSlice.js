import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';




export const getProductDetailThunk = createAsyncThunk(
    'product/detail',
    async (getProductDetailRequest, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://restapirepo.onrender.com/product/detail`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(getProductDetailRequest),
                }
            )
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


const getProductDetailSlice = createSlice({
    name: 'getProductDetailSlice',
    initialState: {
        productDetail: {},
        getProductDetailStatus: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductDetailThunk.pending, (state) => {
                state.getProductDetailStatus = 'loading';
            })
            .addCase(getProductDetailThunk.fulfilled, (state, action) => {
                state.getProductDetailStatus = 'succeeded';
                state.productDetail = action.payload.productDetail
            })
            .addCase(getProductDetailThunk.rejected, (state, action) => {
                state.getProductDetailStatus = 'failed';
                state.getProductDetailResponse = action.payload || { message: 'Không thể tải chi tiết sản phẩm!' };
            });
    },
});


export default getProductDetailSlice
export { getProductDetailThunk }
