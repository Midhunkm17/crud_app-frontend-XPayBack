import React, { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { deleteItemApi, getAllItemApi, viewItemApi } from "../Apis/allApis";
import {
  addResponseContext,
  editResponseContext,
  viewResponseContext,
} from "../Apis/Context";
import { useNavigate } from "react-router-dom";
import EditItem from "./EditItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Pagination } from "react-bootstrap";

function ItemTable() {
  //context
  const { addUpdate } = useContext(addResponseContext);

  const { editUpdate } = useContext(editResponseContext);

  const { setViewItem } = useContext(viewResponseContext);

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  //state to store all items
  const [allItems, setAllItems] = useState([]);

  //getting all items
  const getAllItems = async () => {
    const result = await getAllItemApi();
    setAllItems(result.data);
    // console.log(result);
  };

  useEffect(() => {
    getAllItems();
  }, [addUpdate, editUpdate]);

  //view func
  const handleView = async (e, id) => {
    e.preventDefault();
    const response = await viewItemApi(id);
    //console.log(response);
    setViewItem(response.data);
    navigate("/item-view");
  };

  //delete func
  const handleDelete = async (e, id) => {
    e.preventDefault();
    const response = await deleteItemApi(id);
    //   console.log(response);
    toast.success(`${response.data}`, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    getAllItems();
  };
  //max length of description in table
  const maxLength = 40;

  //  index range of the items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allItems.slice(indexOfFirstItem, indexOfLastItem);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div>
        {allItems && (
          <div>
          <Table
            className="text-center font-mono text-lg font-semibold"
            striped
            bordered
            border-primary
            responsive="md"
            hover
            variant="primary"
          >
            <thead className="table-light">
              <tr>
                <th  className="text-success">Item No.</th>
                <th  className="text-success">Name</th>
                <th  className="text-success">Description</th>
                <th  className="text-success">Manage</th>
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((i, j) => (
                <tr key={indexOfFirstItem+j}>
                  <td>{indexOfFirstItem + j + 1}</td>
                  <td
                    className="cursor-pointer p-3"
                    onClick={(e) => handleView(e, i._id)}
                  >
                    {i.name}
                  </td>
                  <td className=" p-3">
                    {" "}
                    {i.description.length > maxLength
                      ? `${i.description.slice(0, maxLength)}...`
                      : i.description}
                  </td>
                  <td className=" p-3">
                    <span className="flex justify-center">
                      <EditItem items={i} />{" "}
                      <i
                        onClick={(e) => handleDelete(e, i._id)}
                        className="mt-1 fa-solid fa-trash ms-3 text-red-600"
                      ></i>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
           <div className="flex justify-center font-mono p-2 font-semibold">
           <Pagination>
             <Pagination.Prev
               onClick={() => paginate(currentPage - 1)}
               disabled={currentPage === 1}
             />
             {Array.from({
               length: Math.ceil(allItems.length / itemsPerPage),
             }).map((_, index) => (
               <Pagination.Item
                 key={index}
                 active={index + 1 === currentPage}
                 onClick={() => paginate(index + 1)}
               >
                 {index + 1}
               </Pagination.Item>
             ))}
             <Pagination.Next
               onClick={() => paginate(currentPage + 1)}
               disabled={
                 currentPage === Math.ceil(allItems.length / itemsPerPage)
               }
             />
           </Pagination>
         </div>
         </div>
        )}
       
      </div>
      <ToastContainer />
    </div>
  );
}

export default ItemTable;
