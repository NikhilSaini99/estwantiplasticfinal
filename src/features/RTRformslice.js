import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user_id: '',
    from_date: '',
    to_date: '',
    company_name: '',
    address: '' ,
    tin: '',
    first_name:'',
    last_name:'',
    designation:'',
    telephone_number:'',
    cell_phone_number:'',
    email_id:'',
    pmp_opening_stock:0,
    pmp_purchases:0,
    pmp_sales:0,
    pmp_rate:0.35,
    pmp_levy:40,
    pmp_closing_stock:0,
    mmp_opening_stock:0,
    mmp_purchases:0,
    mmp_sales:0,
    mmp_rate:0.30,
    mmp_levy:0,
    mmp_closing_stock:0,
    refuse_bags_opening_stock:0,
    refuse_bags_purchases:0,
    refuse_bags_sales:0,
    refuse_bags_rate:0.35,
    refuse_bags_levy:0,
    refuse_bags_closing_stock:0,
    total_levy_payable:0,
    approval_status:null
}

export const rtrSlice = (createSlice({
    name: 'RTRform',
    initialState,
    reducers: {
        rtrData: (state, action) => {
            return state=action.payload
        },
        existingData: (state,action)=>{
                return state= action.payload
        }
    }
}))

export const { rtrData,existingData } = rtrSlice.actions
export default rtrSlice.reducer;
