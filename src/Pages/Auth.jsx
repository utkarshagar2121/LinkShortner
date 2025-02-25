import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Login from "@/components/Login";
import SignUP from "@/components/SignUP";
import { UrlState } from "@/Context";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const longlink = searchParams.get("createnew");
  const navigate = useNavigate();
  const { isAuthenticated, loading } = UrlState();
  console.log(isAuthenticated, loading);
  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(`/dashboard?${longlink ? `createnew=${longlink}` : ""}`);
    }
  }, [isAuthenticated, loading]);
  return (
    <div className="mt-20 flex flex-col items-center gap-10">
      <h2 className="text-5xl text-white font-extrabold">
        {longlink ? "Hold Up?Login First" : "Login/SignUp"}
      </h2>
      <Tabs defaultValue="LogIn" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="LogIn">Login In</TabsTrigger>
          <TabsTrigger value="SignUp">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="LogIn">
          <Login />
        </TabsContent>
        <TabsContent value="SignUp">
          <SignUP />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
