import React from "react";

const PurchaseCoins = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-md">
        
        <h2 className="text-2xl font-bold text-center mb-6">
          Purchase Coins
        </h2>

        {/* Packages */}
        <div className="space-y-4">
          
          <div className="border p-4 rounded-md flex justify-between items-center hover:shadow">
            <div>
              <h3 className="font-semibold">100 Coins</h3>
              <p className="text-gray-500">$10</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Buy
            </button>
          </div>

          <div className="border p-4 rounded-md flex justify-between items-center hover:shadow">
            <div>
              <h3 className="font-semibold">500 Coins</h3>
              <p className="text-gray-500">$45</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Buy
            </button>
          </div>

          <div className="border p-4 rounded-md flex justify-between items-center hover:shadow">
            <div>
              <h3 className="font-semibold">1000 Coins</h3>
              <p className="text-gray-500">$80</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Buy
            </button>
          </div>
        </div>

        {/* Stripe Placeholder */}
        <div className="mt-6 p-4 border rounded-md bg-gray-50 text-center">
          <p className="text-gray-600">
            Stripe Payment Integration UI Placeholder
          </p>
          <button className="mt-3 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseCoins;