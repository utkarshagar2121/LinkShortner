import { CopyIcon, Delete, Download, Trash } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { date } from "yup";
import { Button } from "./ui/button";
import useFetch from "@/Hooks/userFetch";
import { deleteUrls } from "@/db/apiUrls";
import { BarLoader, BeatLoader } from "react-spinners";

const LinkCard = ({ url, fetchUrls }) => {
  console.log("url", url);
  const donwloadImage = () => {
    const imageurl = url.qr;
    const filename = url.title;

    const a = document.createElement("a");
    a.href = imageurl;
    // a.download = filename;
    // <a href={imageurl} download={filename}></a>;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  const { loading: loadingDelete, fn: fnDelete } = useFetch(
    deleteUrls,
    url?.id
  );
  return (
    <div className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg">
      <img
        src={url.qr}
        alt="qr code"
        className="h-32 object-contain ring ring-blue-500 self-start"
      />
      <Link to={`/link/${url.id}`} className="flex flex-col flex-1">
        <span className="text-3xl font-extrabold hover:underline cursor-pointer">
          {url.title}
        </span>

        <span className="text-2xl text-blue-400 font-hold hover:unnderline cursor-pointer">
          https://trimmr.in/{url?.custom_url ? url?.custom_url : url?.short_url}
        </span>

        <span className="flex items-center gap-1 hover:underline cursor-pointer">
          {url?.original}
        </span>

        <span className="flex items-end font-extralight text-sm flex-1">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          onClick={() => {
            navigator.clipboard.writeText(
              `https://trimmr.in/${
                url?.custom_url ? url?.custom_url : url?.short_url
              }`
            );
          }}
        >
          <CopyIcon />
        </Button>
        <Button variant="ghost" onClick={donwloadImage}>
          <Download />
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            fnDelete().then(() => {
              fetchUrls();
            });
          }}
        >
          {loadingDelete && <BeatLoader size={5} color="#36d7b7" />}
          <Trash />
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;
