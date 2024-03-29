import React from "react";
const News = () => {
  return (
    <div name="news" className="w-full my-32">
      <div className="max-w-[1240px] mx-auto px-2">
        <h2 className="text-5xl font-bold text-center">Latest Updates</h2>
        
        <div className="my-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">

          <div className="flex bg-gray-300 rounded-xl py-6">
            <div>
              <h3 className="font-bold text-lg h-[300px]">Class Ad 1</h3>
            </div>
          </div>

          <div className="flex bg-gray-300 rounded-xl py-6">
            <div>
              <h3 className="font-bold text-lg">Class Ad 2</h3>
            </div>
          </div>

          <div className="flex bg-gray-300 rounded-xl py-6">
            <div>
              <h3 className="font-bold text-lg">Class Ad 3</h3>
            </div>
          </div>

          <div className="flex bg-gray-300 rounded-xl py-6">
            <div>
              <h3 className="font-bold text-lg">Class Ad 4</h3>
            </div>   
          </div>

        </div>
      </div>
    </div>
  );
};

export default News;
