import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Box from "../../components/Box";
import Button from "../../components/Button";
import Col from "../../components/Col";
import LoaderSpinner from "../../components/Loader";
import Row from "../../components/Row";
import { IAllProducts, INewProduct, IUserData } from "../../interfaces/input";
import { instance } from "../../services/api";
import { authSelector } from "../../store/auth/selector";
import View from "./View";

const initialValue = {
  title: "",
  SKU: "",
  image: "",
};

const Dashboard = () => {
  const userData = useSelector(authSelector);
  const router = useRouter();
  const [toggle, setToggle] = useState<boolean>(false);
  const [shopData, setShopData] = useState<IUserData>({
    name: "",
    email: "",
    password: "",
    products: [],
    _id: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (userData && !userData.isLoggedIn) {
      router.push("/");
    }
    if (userData.user && userData.user._id) {
      instance
        .get(`/admin/shop?userId=${userData.user._id}`)
        .then((res: any) => {
          setShopData(res.data);
          setLoading(false);
        });
    }
  }, [userData, toggle]);

  const [newItem, setNewItem] = useState<INewProduct>(initialValue);
  const [addLoading, setAddLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    setNewItem((prev: INewProduct) => {
      return {
        ...prev,
        [target.name]: target.value,
      };
    });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAddLoading(true);
    await instance
      .post("/admin/products", {
        userId: userData.user._id,
        products: [newItem],
      })
      .then((res: any) => {
        setToggle(!toggle);
        alert("new item added ");
      })
      .catch((err) => {
        setError(err.response);
      });
    setAddLoading(false);
  };

  const handleDelete = async (id: string) => {
    await instance
      .delete(`/admin/products?userId=${shopData._id}&productId=${id}`)
      .then(() => {
        setToggle(!toggle);
      });
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <Col className="items-center justify-center min-h-screen">
      {loading ? (
        <LoaderSpinner />
      ) : (
        <>
          <Box>
            <h2>Shop: {shopData.name}</h2>
          </Box>

          <Box className="w-[450px] my-10">
            <h2 className="mb-6 w-full text-center">Add product</h2>
            <Row className="justify-around">
              <Col className="mr-8">
                <p className="font-semibold">Title</p>
                <input
                  className="shadow-hard rounded-lg p-2 border-[1px]"
                  name="title"
                  onChange={handleChange}
                />
                <p className="font-semibold mt-2">SKU</p>
                <input
                  className="shadow-hard rounded-lg p-2 border-[1px]"
                  name="SKU"
                  onChange={handleChange}
                />
                <p className="font-semibold mt-2">Image url</p>
                <input
                  className="shadow-hard rounded-lg p-2 border-[1px]"
                  name="image"
                  onChange={handleChange}
                />
                <p className="text-sm text-red-500">{error && error}</p>
              </Col>
              <Button color="teal" onClick={handleSubmit}>
                {addLoading ? <LoaderSpinner /> : "Confirm"}
              </Button>
            </Row>
          </Box>
          {shopData &&
            shopData.products.map((item: IAllProducts, index: number) => {
              return (
                <View
                  handleDelete={handleDelete}
                  props={item}
                  key={index}
                  handleToggle={handleToggle}
                />
              );
            })}
        </>
      )}
    </Col>
  );
};

export default Dashboard;
