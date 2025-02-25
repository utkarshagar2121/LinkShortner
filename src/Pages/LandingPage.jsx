import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [longURl, setLongUrl] = useState();
  const navigate = useNavigate();

  const handleSumbit = (e) => {
    e.preventDefault();
    if (longURl) {
      navigate(`/auth?createnew=${longURl}`);
    }
  };
  return (
    <div className="flex flex-col items-center w-full">
      <div className="max-w-screen-lg w-full px-4 sm:px-6 md:px-8 text-center">
        <h1 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white font-extrabold">
          The only URL shortener <br /> you will ever need
        </h1>

        <form
          onSubmit={handleSumbit}
          className="sm:h-14 flex flex-col sm:flex-row w-full max-w-lg mx-auto gap-2"
        >
          <Input
            type="url"
            placeholder="Enter the Original URL"
            value={longURl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="h-full flex-1 py-4 px-4"
          />
          <Button className="h-full" type="submit" variant={"destructive"}>
            Shorten!
          </Button>
        </form>

        <img
          src="/banner.jpeg"
          alt="Banner"
          className="w-full my-11 max-w-3xl mx-auto"
        />

        <Accordion
          type="multiple"
          collapsible
          className="w-full max-w-3xl mx-auto my-11"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>How does the Trimmer works</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How does the Trimmer works</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How does the Trimmer works</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default LandingPage;
