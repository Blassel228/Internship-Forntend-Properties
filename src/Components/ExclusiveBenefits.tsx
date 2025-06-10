import React from "react";

const ExclusiveBenefits = () => {
  return (
    <div className="bg-white py-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold">Enjoy the exclusive benefits</h2>
          <div className="flex flex-wrap gap-2 justify-center md:justify-end">
            <button className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
              DISCOVER MORE BENEFITS
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded">
              BECOME A MEMBER
            </button>
          </div>
        </div>

        <p className="text-gray-600 mb-6">
          As a Radisson Rewards member, you enjoy exclusive benefits. You collect points that you can use to enhance your travel experience or to pay for your booking. Join for free and elevate your stay!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-start gap-4 min-h-[120px]">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-bold max-w-2xl mb-1">Member Only Rate</h3>
              <p className="text-gray-600">
                Members get up to 15% discount.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex items-start gap-4 min-h-[120px]">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h.01M5 9a4 4 0 118 0 4 4 0 01-8 0z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-bold mb-1">Discount on Food and Beverages</h3>
              <p className="text-gray-600">
                Discount on food and beverages.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex items-start gap-4 min-h-[120px]">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3m18 0a9 9 0 10-9-9m9 9H6a3 3 0 01-3-3V6a3 3 0 013-3h2m3 6V6a2 2 0 10-4 0v2m4 4V6a2 2 0 10-4 0v2" />
              </svg>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-bold mb-1">Priority Line</h3>
              <p className="text-gray-600">
                Save waiting time during check-in and check-out.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExclusiveBenefits;