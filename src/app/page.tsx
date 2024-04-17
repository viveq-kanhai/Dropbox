import { UserButton } from "@clerk/nextjs";
import { ArrowBigRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div>
        <div className="p-10 flex flex-col bg-[#2B2929] dark:bg-slate-800 text-white space-y-5">
          <h1 className="text-5xl font-bold">
            Welcome to DropClone <br />
            <br />
            Storing everything for you and your business needs. All in one place
          </h1>

          <p className="pb-20">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam
            fugit exercitationem doloremque necessitatibus, consequuntur quam
            veritatis sapiente nostrum omnis. Rem eaque quis delectus
            recusandae, optio ut totam veniam distinctio. Ratione.
          </p>

          <Link
            href="/dashboard"
            className="flex cursor-pointer bg-blue-500 w-fit"
          >
            Try now for free!
            <ArrowBigRight className="ml-10" />
          </Link>
        </div>

        <div>
          <video autoPlay loop muted className="rounded-lg">
            <source
              src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1920.mp4"
              type="video/mp4"
            />
            video not supported
          </video>
        </div>
      </div>
    </main>
  );
}
