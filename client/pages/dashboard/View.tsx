import React, { useState } from "react";
import Box from "../../components/Box";
import Col from "../../components/Col";
import Row from "../../components/Row";
import Image from "next/image";
import Button from "../../components/Button";
import { IAllProducts } from "../../interfaces/input";
import Edit from "./Edit";

interface IView {
  handleDelete: (id: string) => void;
  props: IAllProducts;
  handleToggle: () => void;
}

const View = ({ handleDelete, props, handleToggle }: IView) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleEditMode = () => {
    setEditMode(!editMode);
  };
  return (
    <>
      {!editMode ? (
        <Box className="my-4 w-[450px] overflow-x-clip">
          <Row>
            <Col>
              <div className="relative w-[150px] h-[200px]">
                <Image src={props.image} layout="fill" />
              </div>
            </Col>
            <Col>
              <p className="text-lg font-semibold">Title: {props.title}</p>
              <p className="text-lg font-semibold">SKU: {props.SKU}</p>
              <p className="text-base font-semibold">URL: {props.image}</p>
              <Row className="mt-6">
                <Button color="teal" onClick={() => handleEditMode()}>
                  edit
                </Button>
                <Button onClick={() => handleDelete(props._id)}>Delete</Button>
              </Row>
            </Col>
          </Row>
        </Box>
      ) : (
        <Edit
          handleSwitch={handleEditMode}
          props={props}
          handleToggle={handleToggle}
        />
      )}
    </>
  );
};

export default View;
