import React from "react";

import adMath1 from '../../images/news/ad_math1.png';
import adClass1 from '../../images/news/ad_class1.png';
import adClass2 from '../../images/news/ad_class2.png';
import adSchol1 from '../../images/news/ad_schol1.png';
import adSinhala1 from '../../images/news/ad_sinhala1.png';
import adTamil1 from '../../images/news/ad_tamil1.png';

const News = () => {
  return (
    <div name="news" className="w-full my-32 pt-4 py-1">
      <div className="max-w-[1240px] mx-auto px-2">

        <div className="text-center text-gray-600">
          <h2 className="text-3xl uppercase">Latest Updates</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 relative gap-x-8 gap-y-10 px-2 pt-2 text-black" >

          <div className="rounded-xl shadow-2xl pt-3 h-fit">
              <img
              src={adMath1}
              className="w-full rounded-lg"
              alt="Mathematics class" />
          </div>

          <div className="rounded-xl shadow-2xl pt-3 h-fit">
              <img
              src={adSchol1}
              className="w-full rounded-lg"
              alt="Scholarship class" />
          </div>
          
          <div className="rounded-xl shadow-2xl pt-3 h-fit">
              <img
              src={adClass2}
              className="w-full rounded-lg"
              alt="Maths and Science classes" />
          </div>

          <div className="rounded-xl shadow-2xl pt-3 h-fit md:mt-1">
              <img
              src={adTamil1}
              className="w-full rounded-lg"
              alt="Tamil class" />
          </div>

          <div className="rounded-xl shadow-2xl pt-3 h-fit md:-mt-16">
              <img
              src={adSinhala1}
              className="w-full rounded-lg"
              alt="Sinhala class" />
          </div>

          <div className="rounded-xl shadow-2xl pt-3 h-fit md:-mt-3">
              <img
              src={adClass1}
              className="w-full rounded-lg"
              alt="Classes in vision" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default News;
