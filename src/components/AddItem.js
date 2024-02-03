import React, { useContext } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ItemTable from "./ItemTable";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addItemApi } from "../Apis/allApis";
import { addResponseContext } from "../Apis/Context";

function AddItem() {
  const { setAddUpdate } = useContext(addResponseContext);

  const [item, setItem] = useState({
    name: "",
    description: "",
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setInputs = (e) => {
    const { value, name } = e.target;
    setItem({ ...item, [name]: value });
  };
  // console.log(item);

  const handleAdd = async (e) => {
    e.preventDefault();
    const { name, description } = item;
    if (!name || !description) {
      toast.error("Please fill all details!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const reqBody = new FormData();
      reqBody.append("name", name);
      reqBody.append("description", description);

      //api call
      const result = await addItemApi(reqBody);
      console.log(result);
      if (result.status === 200) {
        toast.success(`${result.data.name} added!`, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setAddUpdate(result.data);
        setItem({ ...item, name: "", description: "" });
        setShow(false);
      } else {
        toast.error(`${result.response.data}`, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <div className="bg-slate-800 h-screen p-3">
      <div className="container bg-dark mt-5 p-3 shadow-2xl">
        <h3 className="text-center text-white text-3xl underline font-extrabold  font-mono">
          Lister<span className="text-red-700">!</span>
        </h3>
        <Button className="mt-4" variant="outline-warning" onClick={handleShow}>
          Add Item <i class="fa-solid fa-plus fa-beat ms-1"></i>
        </Button>

        <Modal show={show} onHide={handleClose}>
          <div className="bg-dark">
            <Modal.Body>
              <FloatingLabel
                controlId="floatingInput"
                label="Name"
                className="mb-3"
              >
                <Form.Control
                  onChange={(e) => setInputs(e)}
                  name="name"
                  type="text"
                  placeholder="Name"
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Description"
                className="mb-3"
              >
                <Form.Control
                  onChange={(e) => setInputs(e)}
                  name="description"
                  type="text"
                  placeholder="Description"
                />
              </FloatingLabel>

              <Button variant="outline-danger" onClick={handleClose}>
                Close
              </Button>
              <Button
                className="ms-2"
                variant="outline-warning"
                onClick={(e) => handleAdd(e)}
              >
                Add Item
              </Button>
            </Modal.Body>
          </div>
        </Modal>
        <div className="mt-3">
          <ItemTable />
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default AddItem;
