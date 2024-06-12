import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';

function FinManagementAd() {
  const year = new Date().getFullYear();
  const month = new Date().toLocaleString('default', { month: 'long' }).toLowerCase();

  const [overallCollection, setOverallCollection] = useState(0);
  const [overallExpenses, setOverallExpenses] = useState(0);
  const [overallPaid, setOverallPaid] = useState(0);

  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        const { data: collectionData } = await api.get(`/finance/collection?month=${month}&year=${year}`);
        const { data: expensesData } = await api.get(`/finance/expenses?month=${month}&year=${year}`);
        const { data: paidData } = await api.get(`/finance/paid?month=${month}&year=${year}`);

        setOverallCollection(collectionData.collection);
        setOverallExpenses(expensesData.expenses);
        setOverallPaid(paidData.paid);
      } catch (error) {
        console.error('Error fetching financial data:', error);
      }
    };

    fetchFinancialData();
  }, [month, year]);

  return (
    <div className='rounded-s-3xl bg-white md:ml-72 md:px-14 py-10 w-full'>
      <div className="flex justify-between">
        <div>
          <p className="text-3xl ml-14 font-bold">{year}, {month.charAt(0).toUpperCase() + month.slice(1)}</p>
        </div>
      </div>

      <div className="bg-white text-slate-900 m-14 mt-2 pt-6 py-4 rounded-xl shadow-2xl">
        <div className="py-1 lg:py-4 px-32 mx-auto max-w-screen-md space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-medium">Overall Collection:</p>
            <p className="text-2xl font-medium text-indigo-700">Rs.{overallCollection}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-2xl font-medium">Overall Expenses:</p>
            <p className="text-2xl font-medium text-indigo-700">Rs.{overallExpenses}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-2xl font-medium">Overall Paid:</p>
            <p className="text-2xl font-medium text-indigo-700">Rs.{overallPaid}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-14 px-14 mt-0">
        <Link to="/ad_finmanagement/classfees" className="no-underline">
          <div className="flex flex-col items-center justify-center bg-gray-200 p-6 rounded-xl shadow-md hover:bg-gray-300 transition h-64">
            <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-800" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 10V9.91667C15 8.85812 14.1419 8 13.0833 8H11C9.89543 8 9 8.89543 9 10C9 11.1046 9.89543 12 11 12H13C14.1046 12 15 12.8954 15 14C15 15.1046 14.1046 16 13 16H10.9583C9.87678 16 9 15.1232 9 14.0417V14M12 17.5V6.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="mt-3 text-2xl font-medium text-indigo-800 text-center">Class Fees</span>
          </div>
        </Link>
        <Link to="/ad_finmanagement/payment" className="no-underline">
          <div className="flex flex-col items-center justify-center bg-gray-200 p-6 rounded-xl shadow-md hover:bg-gray-300 transition h-64">
            <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-800" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 8H4M6 16H4M6 12H3M7 4.51555C8.4301 3.55827 10.1499 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C10.1499 21 8.4301 20.4417 7 19.4845M14 9.49991C13.5 9.37589 12.6851 9.37133 12 9.37589M12 9.37589C11.7709 9.37742 11.9094 9.36768 11.6 9.37589C10.7926 9.40108 10.0016 9.73666 10 10.6874C9.99825 11.7002 11 11.9999 12 11.9999C13 11.9999 14 12.2311 14 13.3124C14 14.125 13.1925 14.4811 12.1861 14.599C12.1216 14.599 12.0597 14.5991 12 14.5994M12 9.37589L12 8M12 14.5994C11.3198 14.6022 10.9193 14.6148 10 14.4999M12 14.5994L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="mt-3 text-2xl font-medium text-indigo-800 text-center">Payment portal</span>
          </div>
        </Link>
        <Link to="/ad_finmanagement/expenses" className="no-underline">
          <div className="flex flex-col items-center justify-center bg-gray-200 p-6 rounded-xl shadow-md hover:bg-gray-300 transition h-64">
            <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-800" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 7.14614C13.5 7.00383 12.6851 6.99859 12 7.00383C11.7709 7.00558 11.9094 6.9944 11.6 7.00383C10.7926 7.03273 10.0016 7.41781 10 8.50882C9.99825 9.67108 11 10.015 12 10.015C13 10.015 14 10.2803 14 11.5211C14 12.4536 13.1925 12.8621 12.1861 12.9974C11.3861 12.9974 11 13.0272 10 12.8838M12 13V14M12 6V7M21 17V17.8C21 18.9201 21 19.4802 20.782 19.908C20.5903 20.2843 20.2843 20.5903 19.908 20.782C19.4802 21 18.9201 21 17.8 21H6.2C5.0799 21 4.51984 21 4.09202 20.782C3.71569 20.5903 3.40973 20.2843 3.21799 19.908C3 19.4802 3 18.9201 3 17.8V17M19 10C19 13.866 15.866 17 12 17C8.13401 17 5 13.866 5 10C5 6.13401 8.13401 3 12 3C15.866 3 19 6.13401 19 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="mt-3 text-2xl font-medium text-indigo-800 text-center">New Expenses</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default FinManagementAd;
