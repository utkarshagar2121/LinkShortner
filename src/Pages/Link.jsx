import { Button } from "@/components/ui/button";
import { UrlState } from "@/Context";
import { getClicks, getClicksforUrls } from "@/db/apiClicks";
import { deleteUrls, getUrlsforstats } from "@/db/apiUrls";
import useFetch from "@/Hooks/userFetch";
import {
  Copy,
  CopyIcon,
  Download,
  Link2,
  LinkIcon,
  Target,
  Trash,
} from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LocationStats from "@/components/location-stats";
import DeviceStats from "@/components/device-stats";

const Link = () => {
  const { user } = UrlState();
  const { id } = useParams();
  const navigate = useNavigate();
  // console.log("id of link is ", id);
  const {
    data: url,
    error,
    loading,
    fn,
  } = useFetch(getUrlsforstats, {
    id,
    user_id: user?.id,
  });

  const {
    data: clicks,
    error: errorclicks,
    loading: loadingclicks,
    fn: fnclicks,
  } = useFetch(getClicksforUrls, id);

  useEffect(() => {
    fn(); // Fetch URL url
  }, []);

  useEffect(() => {
    if (!error && loading === false) {
      console.log("inside the function", url);
      fnclicks();
    }
  }, [loading, error]);

  if (error) {
    navigate("/dashboard");
  }

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url.short_url;
  }

  const downloadImage = () => {
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
    <div className="m-10">
      {(loading || loadingclicks) && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}
      <div className="flex flex-col gap-8 sm:flex-row justify-between">
        <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
          <span className="text-6xl font-extrabold hover:underline cursor-pointer">
            {url?.title}
          </span>
          <a
            href={`https://trimmr.in/${link}`}
            target="_blank"
            className="text-3xl sm:text-4xl text-blue-400 font-bold hover:underline cursor-pointer"
          >
            https://trimmr.in/{link}
          </a>
          <a
            href={url?.original_url}
            target="_blank"
            className="flex items-center gap-1 hover:underline cursor-pointer"
          >
            <LinkIcon className="p-1" />
            {url?.original_url}
          </a>

          <span className="flex items-end font-extralight text-sm">
            {new Date(url?.created_at).toLocaleString()}
          </span>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() =>
                navigator.clipboard.writeText(`https://trimrr.in/${link}`)
              }
            >
              <Copy />
            </Button>
            <Button variant="ghost" onClick={downloadImage}>
              <Download />
            </Button>
            <Button
              variant="ghost"
              onClick={() => fnDelete().then(() => navigate("/dashboard"))}
              disabled={loadingDelete}
            >
              {loadingDelete ? (
                <BeatLoader size={5} color="white" />
              ) : (
                <Trash />
              )}
            </Button>
          </div>
          <img
            src={url?.qr}
            className="w-full self-center sm:self-start ring ring-blue-500 p-1 object-contain"
            alt="qr code"
          />
        </div>

        <Card className="sm:w-3/5">
          <CardHeader>
            <CardTitle className="test-4xl font-extrabold">Stats</CardTitle>
          </CardHeader>
          {clicks && clicks?.length ? (
            <CardContent className="flex flex-col gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{clicks?.length ? clicks.length : 0}</p>
                </CardContent>
              </Card>
              <CardTitle>Location Data</CardTitle>
              <LocationStats stats={clicks} />
              <CardTitle>Device Info</CardTitle>
              <DeviceStats stats={clicks} />
            </CardContent>
          ) : (
            <CardContent>
              {loadingclicks === false ? "No statistics yet" : "Loading..."}
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Link;
