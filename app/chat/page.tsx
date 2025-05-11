"use client";
import Image from "next/image";
import Logo1 from "@/public/logo1.png";
import { FileUpload } from "@/components/ui/file-upload";
import { useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { queries } from "@/utils/queries";
import Link from "next/link";
import { toast } from "sonner";
import axios from "axios";
import Loader from "@/components/Loader";
import QueryForm from "@/components/QueryForm";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Chat = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (files: File[]) => {
    setFiles(files);
    if (!files) {
      toast("No files provided");
      return;
    }
    const formData = new FormData();
    formData.append("file", files[0]);
    try {
      setUploading(true);
      await axios.post("/api/upload-document", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast("Document uploaded successfully");
    } catch (error) {
      console.error("Error", error);
      toast("Something went wrong!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className=" md:min-h-screen h-full w-full flex-col flex md:items-center md:justify-center  bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <BackgroundBeams />
      <Link
        href={"/"}
        className="w-full flex items-center justify-center md:gap-[15rem] gap-[5rem] cursor-pointer "
      >
        <Image src={Logo1} alt="Logo" height={150} />
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Link>
      <div className="p-4 max-w-7xl flex flex-col items-center justify-between mx-auto relative z-10 w-full md:pt-0 flex-1 ">
        {/*  File Upload */}
        {uploading ? (
          <Loader text="Uploading..." />
        ) : files && files.length !== 0 ? (
          <span>{files[0].name}</span>
        ) : (
          <FileUpload onChange={handleFileUpload} />
        )}

        <div className=" rounded-md flex flex-col antialiased  dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards items={queries} direction="right" speed="slow" />
        </div>

        {/* Query Form */}
        <QueryForm />
      </div>
    </div>
  );
};

export default Chat;
