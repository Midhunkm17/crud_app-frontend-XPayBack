import { baseUrl } from "./baseUrl";
import { commonApi } from "./commonApi";


//add item
export const addItemApi=async (body)=>{
    return await commonApi('POST',`${baseUrl}/add-item`,body,"")
}

//get all items
export const getAllItemApi=async ()=>{
    return await commonApi('GET',`${baseUrl}/getall-item`,"","")
}

//view item
export const viewItemApi=async (id)=>{
    return await commonApi('GET',`${baseUrl}/view-item/${id}`,"","")
}

//edit item
export const editItemApi=async (body,id)=>{
    return await commonApi('PUT',`${baseUrl}/edit-item/${id}`,body,"")
}

//delete item
export const deleteItemApi=async (id)=>{
    return await commonApi('DELETE',`${baseUrl}/delete-item/${id}`,{},"")
}