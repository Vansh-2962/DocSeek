import { IconSend } from "@tabler/icons-react";
import React, { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import Loader from "./Loader";
import Image from "next/image";
import logo1 from "@/public/logo1.png";

const QueryForm = () => {
  const [query, setQuery] = useState<string>("");
  const [querying, setQuerying] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string[]>([]);

  const handleQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) {
      toast.error("Please enter your query");
      return;
    }
    try {
      setQuerying(true);
      const response = await axios.post("/api/query", { query });
      setAnswer((prev) => [...prev, response?.data?.answer]);
    } catch (error) {
      toast.error(`Error in getting response : ${error}`);
    } finally {
      setQuerying(false);
      setQuery("");
    }
  };

  return (
    <>
      {answer &&
        answer.length !== 0 &&
        answer?.map((ans, i) => (
          <div
            key={i}
            className="text-white bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent rounded-lg md:p-5 flex md:flex-row flex-col gap-4 md:items-center py-4 my-2 md:w-4xl"
          >
            <Image
              src={logo1}
              alt="logo"
              width={60}
              className="bg-cyan-500/20 rounded-full"
            />
            <p>{ans}</p>
          </div>
        ))}

      {querying ? (
        <Loader text="Getting response..." />
      ) : (
        <form
          onSubmit={handleQuery}
          className="md:w-3/4 w-full  my-5 text-white flex flex-col md:flex-row items-center gap-3 relative"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-cyan-500/10 w-full outline-none p-2 px-5 border-b border-cyan-500"
            placeholder="Ask anything"
          />
          <button className=" p-2 rounded-full  text-cyan-500  px-3 cursor-pointer absolute right-2">
            <IconSend className="w-4 h-4 " />
          </button>
        </form>
      )}
    </>
  );
};

export default QueryForm;
