import React from "react";
import { useEffect, useState } from 'react';
import clzab from '../../images/clzab.png';
import '../../styles/web_home.css';

const About = () => {

  const [counts, setCounts] = useState([0, 0, 0]);

  const updateCount1 = () => {
    setCounts(prevCounts => {
      if (prevCounts[0] < 550) {
        return [prevCounts[0] + 5, prevCounts[1], prevCounts[2]];
      } else {
        return prevCounts;
      }
    });
  };

  const updateCount2 = () => {
    setCounts(prevCounts => {
      if (prevCounts[1] < 2) {
        return [prevCounts[0], prevCounts[1] + 1, prevCounts[2]];
      } else {
        return prevCounts;
      }
    });
  };

  const updateCount3 = () => {
    setCounts(prevCounts => {
      if (prevCounts[2] < 15) {
        return [prevCounts[0], prevCounts[1], prevCounts[2] + 1];
      } else {
        return prevCounts;
      }
    });
  };

  useEffect(() => {
    const interval1 = setInterval(updateCount1, 20);
    const interval2 = setInterval(updateCount2, 700);
    const interval3 = setInterval(updateCount3, 130);

    // Clear intervals when component unmounts or when counts reach their limits
    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
    };
  }, []); // No dependencies in the useEffect hook

  return (
    <div className="w-full mt-0">
      <div  className="max-w-[1240px] mx-auto mt-0">
        <div className="flex mt-0 grid md:grid-cols-2">

          <div className="shrink-1 mb-1 grow-0 basis-auto md:mb-0 md:shrink-0 px-8 pt-2">   
            <img
              src={clzab}
              className="w-full"
              alt="Vision Institute - Atabage" />  
          </div>

          <div className="text-center px-4">
            <h2 className="text-5xl font-bold mt-4">Who We Are?</h2>
            <p name ="about" className="text-2xl py-6 pb-6 text-gray-600 text-left">
            We are happy to inform you that our Vision Education Institute, which was started in the year 2022, is currently successfully carrying out educational activities, gaining the approval of parents and children. Learning activities are conducted by the qualified and experienced school teachers of our institution and we invite you to join and make your future successful.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-1 px-2 text-center">
          <div  className="py-6">
            <p className="text-5xl font-bold text-indigo-900">[{counts[0]}+]</p>
            <p className="text-gray-500 text-2xl mt-2">Students</p>
          </div>
          <div className="py-6">
            <p className="text-5xl font-bold text-indigo-900">[{counts[1]}+]</p>
            <p className="text-gray-500 text-2xl mt-2">Years of Experience</p>
          </div>
          <div className="py-6">
            <p className="text-5xl font-bold text-indigo-900">[{counts[2]}+]</p>
            <p className="text-gray-500 text-2xl mt-2">Teachers</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;

