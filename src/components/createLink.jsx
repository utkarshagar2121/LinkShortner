import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UrlState } from "@/Context";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Error from "./ui/error";
import { Card } from "./ui/card";
import * as yup from "yup";
import useFetch from "@/Hooks/userFetch";
import { QRCode } from "react-qrcode-logo";
import { createUrls } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";
const CreateLink = () => {
  const { user } = UrlState();
  const navigate = useNavigate();
  const ref = useRef();
  let [searchParams, setsearchParams] = useSearchParams();
  const longling = searchParams.get("createnew");
  const [errors, setError] = useState(null);
  const [formData, setformData] = useState({
    title: "",
    long_url: longling ? longling : "",
    custom_url: "",
  });

  const {
    data,
    error: error,
    loading,
    fn: fnCreateUrl,
  } = useFetch(createUrls, { ...formData, user_id: user.id });

  const schema = yup.object().shape({
    title: yup.string("Must be a String").required("Title is required"),
    custom_url: yup.string(),
  });

  const handleSubmit = async () => {
    setError({});
    try {
      await schema.validate(formData, { abortEarly: false });

      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));

      await fnCreateUrl(blob);
      console.log("formData", formData);
      console.log("data", data);
    } catch (e) {
      const newErrors = {};
      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setError(newErrors);
    }
  };

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    if (error === null && data) {
      navigate(`/link/${data[0].id}`);
    }
  }, [error, data]);

  return (
    <div>
      <Dialog
        defaultOpen={longling}
        onOpenChange={(res) => {
          if (!res) {
            setsearchParams({});
            setformData({
              title: "",
              long_url: "",
              custom_url: "",
            });
          }
        }}
      >
        <DialogTrigger>
          <Button variant="destructive">Create New Link</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
          </DialogHeader>

          {formData?.long_url && (
            <QRCode value={formData?.long_url} size={250} ref={ref} />
          )}
          <Input
            id="title"
            placeholder="Short Link's Title "
            value={formData.title}
            onChange={handleChange}
          ></Input>
          {/* {errors.title && <Error message={errors.title} />} */}
          <Input
            id="long_url"
            placeholder="Enter your Long URL "
            value={formData.long_url}
            onChange={handleChange}
          ></Input>
          {/* {errors.long_url && <Error message={errors.long_url} />} */}
          <div className="flex items-center gap-2">
            <Card className="p-2">trimmr.in</Card>/
            <Input
              id="custom_url"
              placeholder="Enter your custom Link{optional} "
              value={formData.custom_url}
              onChange={handleChange}
            ></Input>
          </div>
          {error && <Error message={error.message} />}

          <DialogFooter className="sm:justify-start">
            <Button
              disabled={loading}
              type="submit"
              variant="destructive"
              onClick={handleSubmit}
            >
              {loading ? <BeatLoader size={5} /> : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateLink;
