import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutAction } from "../store/auth/actions";
import { authSelector } from "../store/auth/selector";
import Button from "./Button";
import Row from "./Row";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const userData = useSelector(authSelector);
  const { isLoggedIn } = userData;

  const handleLogOut = () => {
    dispatch(logOutAction());
  };
  return (
    <Row className="sticky top-0 items-center p-4 justify-center shadow-hard bg-slate-500">
      {isLoggedIn ? (
        <Button color="purple" onClick={() => handleLogOut()}>
          Sign out
        </Button>
      ) : (
        <Button
          color="teal"
          onClick={() => {
            router.push("/");
          }}
        >
          Home
        </Button>
      )}
    </Row>
  );
};

export default Navbar;
