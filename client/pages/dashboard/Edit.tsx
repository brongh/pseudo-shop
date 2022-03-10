import React, { useState } from "react";
import Box from "../../components/Box";
import Button from "../../components/Button";
import Col from "../../components/Col";
import Row from "../../components/Row";
import { IAllProducts } from "../../interfaces/input";
import { instance } from "../../services/api";

interface IEdit {
  handleSwitch: () => void;
  props: IAllProducts;
  handleToggle: () => void;
}

const Edit = ({ handleSwitch, props, handleToggle }: IEdit) => {
  const [editData, setEditData] = useState<IAllProducts>({
    _id: props._id || "",
    title: props.title || "",
    SKU: props.SKU || "",
    image: props.image || "",
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    setEditData((prev: IAllProducts) => {
      return {
        ...prev,
        [target.name]: target.value,
      };
    });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await instance
      .put("/admin/products", {
        productId: editData._id,
        payload: {
          title: editData.title,
          SKU: editData.SKU,
          image: editData.image,
        },
      })
      .then((res: any) => {
        handleToggle();
        handleSwitch();
      });
  };

  return (
    <Box className="w-[450px] my-4 overflow-x-clip">
      <Row>
        <Col>
          <p className="font-semibold">Title</p>
          <input
            className="shadow-hard rounded-lg p-2 border-[1px]"
            name="title"
            onChange={handleChange}
            value={editData.title}
          />
          <p className="font-semibold mt-2">SKU</p>
          <input
            className="shadow-hard rounded-lg p-2 border-[1px]"
            name="SKU"
            onChange={handleChange}
            value={editData.SKU}
          />
          <p className="font-semibold mt-2">Image url</p>
          <input
            className="shadow-hard rounded-lg p-2 border-[1px]"
            name="image"
            onChange={handleChange}
            value={editData.image}
          />
        </Col>
        <Col className="h-full w-full ml-4">
          <Button color="teal" className="mb-6" onClick={handleSubmit}>
            Confirm
          </Button>
          <Button onClick={handleSwitch}>Cancel</Button>
        </Col>
      </Row>
    </Box>
  );
};

export default Edit;
