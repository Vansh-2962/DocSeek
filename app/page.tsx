import { Spotlight } from "@/components/ui/spotlight";
import Image from "next/image";
import Logo1 from "@/public/logo1.png";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <>
      {/* <div className="h-screen w-full flex-col flex md:items-center md:justify-center  bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="white"
        />
        <div className="w-full flex items-center justify-center ">
          <Image src={Logo1} alt="Logo" height={200} />
        </div>
        <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0  flex-1">
          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            DocSeek <br />
            <span className="md:text-nowrap text-lg md:text-6xl ">
              AI that understands documents.
            </span>
          </h1>
          <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
            Your Intelligent Assistant for Seamless Document Search and Instant
            Answers.
          </p>
          <Link
            href={"/chat"}
            className="mt-8 flex items-center flex-col justify-center"
          >
            <button className="p-2 text-cyan-500 px-10 rounded-md cursor-pointer font-semibold ">
              Get Started
            </button>
            <span className="h-[0.05rem] w-64 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          </Link>
        </div>
      </div> */}
      <div className="relative flex h-screen w-full overflow-hidden bg-black/[0.96] antialiased md:items-center md:justify-center">
        <div
          className={cn(
            "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
            "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
          )}
        />

        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="cyan"
        />
        <div className="flex flex-col items-center justify-between  h-full">
          <Link href={"/"} className="w-full flex items-center justify-center ">
            <Image src={Logo1} alt="Logo" height={200} />
          </Link>
          <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0  flex-1">
            <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
              DocSeek <br />
              <span className="md:text-nowrap text-lg md:text-6xl ">
                AI that understands documents.
              </span>
            </h1>
            <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
              Your Intelligent Assistant for Seamless Document Search and
              Instant Answers.
            </p>
            <Link
              href={"/chat"}
              className="mt-8 flex items-center flex-col justify-center"
            >
              <button className="p-2 text-cyan-500 px-10 rounded-md cursor-pointer font-semibold ">
                Get Started
              </button>
              <span className="h-[0.05rem] w-64 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
