import { Link } from "react-router-dom";
import Helmet1 from "../image/helmet1.jpg";
import Helmet2 from "../image/helmet2.jpg";
import Helmet3 from "../image/helmet3.jpg";
import Helmet4 from "../image/helmet4.jpg";

export const HomePage = () => {
  return (
    <div className="container mx-auto h-full grid grid-cols-2 gap-16 items-center justify-center text-white pt-16 ">
      <div className="col-span-1 flex flex-col items-center gap-4">
        <div className="flex gap-4 ml-8">
          <img
            className="bg-gray-500 w-40 h-36 object-cover"
            src={Helmet1}
            alt="helmet-1"
          />
          <img
            className="bg-gray-500 w-40 h-36 object-cover"
            src={Helmet2}
            alt="helmet-2"
          />
        </div>
        <div className="flex gap-4">
          <img
            className="bg-gray-500 w-40 h-36 object-cover"
            src={Helmet3}
            alt="helmet-3"
          />{" "}
          <img
            className="bg-gray-500 w-40 h-36 object-cover"
            src={Helmet4}
            alt="helmet-4"
          />
        </div>
      </div>
      <div className="col-span-1 flex flex-col items-start gap-8">
        <h1 className="text-3xl">
          The Best
          <br />
          <span className="text-green-500">Uptime Monitoring</span> Service
        </h1>
        <h3 className="text-md">Get Realtime Insight for Helmet Security</h3>
        <div className="w-full flex gap-16">
          <button className="bg-green-500 px-8 py-2 rounded-full">
            <Link to="/stream">Open Camera</Link>
          </button>
          <button className="bg-green-500 px-8 py-2 rounded-full">
            <Link to="/monitor">Open Monitor</Link>
          </button>
        </div>
      </div>
    </div>
  );
};
