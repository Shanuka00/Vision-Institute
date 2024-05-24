import React from 'react';
import { Link } from 'react-router-dom';

function NewRegAd() {
    return (
        <div className="rounded-s-3xl bg-white md:ml-72 md:px-20 py-16 w-full">
            <div className="grid grid-cols-2 gap-14">
                <Link to="/ad_newreg/student" className="no-underline">
                    <div className="flex flex-col items-center justify-center bg-gray-200 p-6 rounded-xl shadow-md hover:bg-gray-300 transition h-64">
                    <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-800" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.5 14C16.2164 12.8589 14.981 12 13.5 12C12.019 12 10.7836 12.8589 10.5 14M13.5 8H13.51M18 21H10.2C7.67976 21 6.41965 21 5.45704 20.5095C4.61031 20.0781 3.9219 19.3897 3.49047 18.543C3 17.5804 3 16.3202 3 13.8V6M9.2 18H17.8C18.9201 18 19.4802 18 19.908 17.782C20.2843 17.5903 20.5903 17.2843 20.782 16.908C21 16.4802 21 15.9201 21 14.8V6.2C21 5.0799 21 4.51984 20.782 4.09202C20.5903 3.71569 20.2843 3.40973 19.908 3.21799C19.4802 3 18.9201 3 17.8 3H9.2C8.0799 3 7.51984 3 7.09202 3.21799C6.71569 3.40973 6.40973 3.71569 6.21799 4.09202C6 4.51984 6 5.07989 6 6.2V14.8C6 15.9201 6 16.4802 6.21799 16.908C6.40973 17.2843 6.71569 17.5903 7.09202 17.782C7.51984 18 8.0799 18 9.2 18ZM14.5 8C14.5 8.55228 14.0523 9 13.5 9C12.9477 9 12.5 8.55228 12.5 8C12.5 7.44772 12.9477 7 13.5 7C14.0523 7 14.5 7.44772 14.5 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                        <span className="mt-3 text-3xl font-medium text-indigo-800 text-center">
                            New student<br />registration
                        </span>
                    </div>
                </Link>
                <Link to="/ad_newreg/teacher" className="no-underline">
                    <div className="flex flex-col items-center justify-center bg-gray-200 p-6 rounded-xl shadow-md hover:bg-gray-300 transition h-64">
                    <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-800" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 16H20M12 9H12.01M15.8739 16C15.4299 14.2748 13.8638 13 12 13C10.1361 13 8.57002 14.2748 8.12598 16M13 9C13 9.55228 12.5523 10 12 10C11.4477 10 11 9.55228 11 9C11 8.44772 11.4477 8 12 8C12.5523 8 13 8.44772 13 9ZM7.2 4H16.8C17.9201 4 18.4802 4 18.908 4.21799C19.2843 4.40973 19.5903 4.71569 19.782 5.09202C20 5.51984 20 6.0799 20 7.2V16.8C20 17.9201 20 18.4802 19.782 18.908C19.5903 19.2843 19.2843 19.5903 18.908 19.782C18.4802 20 17.9201 20 16.8 20H7.2C6.0799 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4 18.4802 4 17.9201 4 16.8V7.2C4 6.0799 4 5.51984 4.21799 5.09202C4.40973 4.71569 4.71569 4.40973 5.09202 4.21799C5.51984 4 6.0799 4 7.2 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                        <span className="mt-3 text-3xl font-medium text-indigo-800 text-center">
                            New teacher<br />registration
                        </span>
                    </div>
                </Link>
                <Link to="/ad_newreg/course" className="no-underline">
                    <div className="flex flex-col items-center justify-center bg-gray-200 p-6 rounded-xl shadow-md hover:bg-gray-300 transition h-64">
                    <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-800" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 21H6.2C5.0799 21 4.51984 21 4.09202 20.782C3.71569 20.5903 3.40973 20.2843 3.21799 19.908C3 19.4802 3 18.9201 3 17.8V8.2C3 7.0799 3 6.51984 3.21799 6.09202C3.40973 5.71569 3.71569 5.40973 4.09202 5.21799C4.51984 5 5.0799 5 6.2 5H17.8C18.9201 5 19.4802 5 19.908 5.21799C20.2843 5.40973 20.5903 5.71569 20.782 6.09202C21 6.51984 21 7.0799 21 8.2V10M7 3V5M17 3V5M3 9H21M13.5 13.0001L7 13M10 17.0001L7 17M14 21L16.025 20.595C16.2015 20.5597 16.2898 20.542 16.3721 20.5097C16.4452 20.4811 16.5147 20.4439 16.579 20.399C16.6516 20.3484 16.7152 20.2848 16.8426 20.1574L21 16C21.5523 15.4477 21.5523 14.5523 21 14C20.4477 13.4477 19.5523 13.4477 19 14L14.8426 18.1574C14.7152 18.2848 14.6516 18.3484 14.601 18.421C14.5561 18.4853 14.5189 18.5548 14.4903 18.6279C14.458 18.7102 14.4403 18.7985 14.405 18.975L14 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                        <span className="mt-3 text-3xl font-medium text-indigo-800 text-center">
                            New course<br />registration
                        </span>
                    </div>
                </Link>
                <Link to="/ad_newreg/admin" className="no-underline">
                    <div className="flex flex-col items-center justify-center bg-gray-200 p-6 rounded-xl shadow-md hover:bg-gray-300 transition h-64">
                    <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-800" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 16V11H7V16H10ZM10 16H13V8H10V16ZM11 20H7.2C6.0799 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4 18.4802 4 17.9201 4 16.8V7.2C4 6.0799 4 5.51984 4.21799 5.09202C4.40973 4.71569 4.71569 4.40973 5.09202 4.21799C5.51984 4 6.0799 4 7.2 4H16.8C17.9201 4 18.4802 4 18.908 4.21799C19.2843 4.40973 19.5903 4.71569 19.782 5.09202C20 5.51984 20 6.0799 20 7.2V9.1M19 13.5C19 14.3284 18.3284 15 17.5 15C16.6716 15 16 14.3284 16 13.5C16 12.6716 16.6716 12 17.5 12C18.3284 12 19 12.6716 19 13.5ZM18.5585 18H16.4415C15.5807 18 14.8164 18.5509 14.5442 19.3675L14 21H21L20.4558 19.3675C20.1836 18.5509 19.4193 18 18.5585 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                        <span className="mt-3 text-3xl font-medium text-indigo-800 text-center">
                            New admin<br />registration
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default NewRegAd;
