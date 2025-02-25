import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import Error from "./ui/error";
import * as Yup from "yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import useFetch from "@/hooks/userFetch";
import { signup } from "@/db/apiAuth";
import { UrlState } from "@/Context";

const SignUP = () => {
  const [error, seterror] = useState({});
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });

  const navigate = useNavigate();
  let [searchparam] = useSearchParams();
  const longlink = searchparam.get("createnew");

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setformData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const { data, error: SignUPError, loading, fn } = useFetch(signup);
  const { fetchUser } = UrlState();

  useEffect(() => {
    if (data) {
      navigate(`/dashboard?${longlink ? `createnew=${longlink}` : ""}`);
      fetchUser();
    }
  }, [data]);

  const handleSignUP = async () => {
    console.log("form clicked");
    seterror({});
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password is too short")
          .max(20, "Password is too long")
          .required("Password is required"),
        name: Yup.string().required("Name is required"),
        profile_pic: Yup.mixed().required("Profile pic is required"),
      });

      await schema.validate(formData, { abortEarly: false });

      // Call API with valid data
      await fn(formData);
    } catch (error) {
      const newError = {};
      error.inner?.forEach((err) => {
        newError[err.path] = err.message;
      });
      seterror(newError);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>SignUP</CardTitle>
          <CardDescription>
            Create a new account
            <br />
            {SignUPError && <Error message={SignUPError.message} />}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 flex flex-col gap-4">
          <div className="space-y-1">
            <Input
              name="name"
              type="text"
              placeholder="Name"
              onChange={handleInputChange}
            />
            {error.name && <Error message={error.name} />}
          </div>
          <div className="space-y-1">
            <Input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleInputChange}
            />
            {error.email && <Error message={error.email} />}
          </div>
          <div className="space-y-1">
            <Input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleInputChange}
            />
            {error.password && <Error message={error.password} />}
          </div>
          <div className="space-y-1">
            <Input
              name="profile_pic"
              type="file"
              accept="image/*"
              onChange={handleInputChange}
            />
            {error.profile_pic && <Error message={error.profile_pic} />}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSignUP}>
            {loading ? <BeatLoader size={5} /> : "Create Account"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUP;
