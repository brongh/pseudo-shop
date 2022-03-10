import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Box from "../components/Box";
import Button from "../components/Button";
import Col from "../components/Col";
import LoaderSpinner from "../components/Loader";
import { login } from "../interfaces/input";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoginAction } from "../store/auth/actions";
import { authSelector } from "../store/auth/selector";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userData = useSelector(authSelector);
  const { isLoggedIn, error } = userData;
  const [fields, setFields] = useState<login>({
    email: "",
    password: "",
  });

  const [errorM, setErrorM] = useState<string>("");
  const [loading, setLoading] = useState<Boolean>(false);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    setFields((prevState: login) => {
      return {
        ...prevState,
        [target.name]: target.value,
      };
    });
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    } else if (error && error.errorCode) {
      setErrorM(error.errorMessage);
    }
  }, [userData]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setErrorM("");
    setLoading(true);
    dispatch(fetchLoginAction(fields));
    setLoading(false);
  };

  return (
    <Col className="items-center justify-center min-h-screen">
      <Box>
        <h2>Sign in</h2>
        <Col className="my-6 w-[300px]">
          <p className="font-semibold">Email</p>
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
          <p className="text-red-500 text-sm mt-2">{errorM && errorM}</p>
        </Col>
        <Button color="teal" onClick={handleSubmit}>
          {loading ? <LoaderSpinner /> : "Sign in"}
        </Button>
        <p className="text-center my-4">or</p>
        <Button
          color="purple"
          onClick={() => {
            router.push("/signup");
          }}
        >
          Sign up
        </Button>
      </Box>
    </Col>
  );
};

export default Home;
