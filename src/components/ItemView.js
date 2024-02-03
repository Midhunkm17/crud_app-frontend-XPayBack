import React, { useContext } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { viewResponseContext } from "../Apis/Context";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function ItemView() {
  const { viewItem } = useContext(viewResponseContext);
  // console.log(viewItem);

  return (
    <div className="bg-slate-800 h-screen p-3 shadow-2xl">
      <div className="container bg-dark mt-4  p-2">
      <Link to={"/"} style={{ textDecoration: "none" }}>
          <Button className="mb-3">
            <i class="fa-solid fa-house fa-lg"></i>
          </Button>
        </Link>
        <ListGroup className=" font-extrabold  font-mono w-100">
          <ListGroup.Item className="text-lg ">
            Name :{" "}
            <span className="text-2xl text-blue-950">{viewItem.name}</span>
          </ListGroup.Item>
          <ListGroup.Item className="text-lg">
            Description :{" "}
            <span className="text-2xl text-blue-950 whitespace-normal  break-words max-w-fit ">
              {viewItem.description}
            </span>
          </ListGroup.Item>
        </ListGroup>
      
      </div>
    </div>
  );
}

export default ItemView;
