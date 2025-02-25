import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import Error from "@/components/ui/error";
import useFetch from "@/Hooks/userFetch";
import { getUrls } from "@/db/apiUrls";
import { UrlState } from "@/Context";
import { getClicks } from "@/db/apiClicks";
import CreateLink from "@/components/createLink";
import LinkCard from "@/components/LinkCard";
const Dashboard = () => {
  const [searchQuery, setsearchQuery] = useState("");
  const { user } = UrlState();

  const { loading, error, data: urls, fn: fnUrls } = useFetch(getUrls, user.id);
  console.log("urls", urls);

  const {
    data: clicks,
    loading: loadingClicks,
    fn: fnClicks,
  } = useFetch(getClicks, urls?.length ? urls.map((url) => url.id) : []);

  useEffect(() => {
    fnUrls();
    // console.log("urls.length", urls?.length);
    // if (urls?.length) {
    //   fnClicks();
    // }
  }, []);

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    console.log("urls?.length", urls?.length);
    if (urls?.length) {
      console.log("Inside the useEffect");
      fnClicks();
    }
    console.log("clicks", clicks);
  }, [urls?.length]);

  console.log("clicks", clicks);
  return (
    <div className="flex flex-col mx-10 gap-8">
      {(loading || loadingClicks) && (
        <BarLoader width={"10%"} color="#36d7b7" />
      )}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{urls?.length ? urls.length : 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length ? clicks.length : 0}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <h1>My Links</h1>
        <CreateLink />
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Filter Links"
          onChange={(e) => setsearchQuery(e.target.value)}
        />
        <Filter className="absolute top-2 right-2 p-1" />
      </div>
      {error && <Error message={error.messgae} />}
      {(filteredUrls || []).map((url, id) => {
        return <LinkCard key={id} url={url} fetchUrls={fnUrls} />;
      })}
    </div>
  );
};

export default Dashboard;
