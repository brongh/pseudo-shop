import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "../../components/Box";
import Button from "../../components/Button";
import Col from "../../components/Col";
import LoaderSpinner from "../../components/Loader";
import { signup } from "../../interfaces/input";
import { fetchSignUpAction } from "../../store/auth/actions";
import { authSelector } from "../../store/auth/selector";

const SignupPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userData = useSelector(authSelector);
  const { isLoggedIn, error } = userData;
  const [errorM, setErrorM] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [fields, setFields] = useState<signup>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    console.log(userData);
    if (isLoggedIn) {
      console.log("logged in");
    } else if (error && error.errorCode) {
      setErrorM(error.errorMessage);
    }
  }, [userData]);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    setFields((prev: signup) => {
      return {
        ...prev,
        [target.name]: target.value,
      };
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setErrorM("");
    setLoading(true);
    if (!fields.name || !fields.email || !fields.password || !fields.password) {
      setErrorM("Please fill up all fields");
      setLoading(false);
      return;
    }
    if (fields.password !== fields.confirmPassword) {
      setErrorM("Passwords do not match");
      setLoading(false);
      return;
    }
    dispatch(fetchSignUpAction(fields));
    setLoading(false);
  };

  return (
    <Col className="items-center justify-center min-h-screen">
      <Box>
        <h2>Sign up</h2>
        <Col className="my-6 w-[300px]">
          <p className="font-semibold">Shop Name</p>
          <input
            name="name"
            onChange={handleChange}
            className="shadow-hard p-2 border-[1px] border-black rounded-lg"
          />
          <p className="font-semibold mt-4">Email</p>
          <input
            name="email"
            onChange={handleChange}
            className="shadow-hard p-2 border-[1px] border-black rounded-lg"
          />
          <p className="font-semibold mt-4">Password</p>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            className="shadow-hard p-2 border-[1px] border-black rounded-lg"
          />
          <p className="font-semibold mt-4">Confirm Password</p>
          <input
            name="confirmPassword"
            type="password"
            onChange={handleChange}
            className="shadow-hard p-2 border-[1px] border-black rounded-lg"
          />
          <p className="text-red-500 text-sm mt-2">{errorM && errorM}</p>
        </Col>
        <Button color="teal" onClick={handleSubmit}>
          {loading ? <LoaderSpinner /> : "Sign up"}
        </Button>
        <p className="text-center my-4">or</p>
        <Button
          color="purple"
          onClick={() => {
            router.push("/");
          }}
        >
          Sign in
        </Button>
      </Box>
    </Col>
  );
};

export default SignupPage;
