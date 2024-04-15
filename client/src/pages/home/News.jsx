import React from "react";

import adMath1 from '../../images/news/ad_math1.png';


const News = () => {
  return (
    <div name="news" className="w-full my-32 pt-4 py-1">
      <div className="max-w-[1240px] mx-auto px-2">

        <div className="text-center text-gray-600">
          <h2 className="text-3xl uppercase">Latest Updates</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 relative gap-x-8 gap-y-10 px-2 pt-2 text-black" >

          <div className="rounded-xl shadow-2xl pt-3">
              <img
              src={adMath1}
              className="w-full rounded-lg"
              alt="Mathematics class" />
          </div>

          <div className="rounded-xl shadow-2xl pt-3">
              <img
              src={adMath1}
              className="w-full rounded-lg"
              alt="Mathematics class" />
          </div>

          <div className="rounded-xl shadow-2xl pt-3">
              <img
              src={adMath1}
              className="w-full rounded-lg"
              alt="Mathematics class" />
          </div>

          <div className="rounded-xl shadow-2xl pt-3">
              <img
              src={adMath1}
              className="w-full rounded-lg"
              alt="Mathematics class" />
          </div>

          <div className="rounded-xl shadow-2xl pt-3">
              <img
              src={adMath1}
              className="w-full rounded-lg"
              alt="Mathematics class" />
          </div>

          <div className="rounded-xl shadow-2xl pt-3">
              <img
              src={adMath1}
              className="w-full rounded-lg"
              alt="Mathematics class" />
          </div>


        </div>
      </div>
    </div>
  );
};

export default News;
