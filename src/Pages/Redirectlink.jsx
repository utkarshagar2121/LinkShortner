import { getLongUrl } from "@/db/apiUrls";
import { storeclicks } from "@/db/apiClicks";
import useFetch from "@/Hooks/userFetch";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const Redirectlink = () => {
  const { id } = useParams();
  console.log("id", id);

  const { data, error, loading, fn: fngetUrl } = useFetch(getLongUrl, id);

  const { loading: laodingclicks, fn: fnclicks } = useFetch(storeclicks, {
    id: data?.id,
    originalUrl: data?.original,
  });
  console.log("data?.original", data?.original);

  const navigate = useNavigate();
  useEffect(() => {
    fngetUrl();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      fnclicks();
    }
  }, [loading]);

  if (loading || laodingclicks)
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <BarLoader width={"80%"} color="#36d7b7" />
        <h1>Redirecting</h1>
      </div>
    );
  // console.log("data of rdirectlink", data);
  // if (!loading && !laodingclicks && data) {
  //   console.log("data is therer for directlink");
  //   window.location.href = data?.original;
  // }

  return null;
};

export default Redirectlink;
