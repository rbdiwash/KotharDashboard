import React from "react";

const Test = ({ student }) => {
  return (
    <>
      <div className="my-4 grid grid-cols-12 gap-4">
        <div className="col-span-3 sub-heading mt-0">Test</div>
        <div className="col-span-9">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                <tr>
                  <th scope="col" className="px-6 py-5 text-base">
                    Test Type
                  </th>
                  <th scope="col" className="px-6 py-5 text-base">
                    Overall Score
                  </th>
                  <th scope="col" className="px-6 py-5 text-base">
                    Date of Examination
                  </th>
                  <th scope="col" className="px-6 py-5 text-base">
                    Unique ID
                  </th>
                  <th scope="col" className="px-6 py-5 text-base">
                    Documents Uploaded
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    Apple MacBook Pro 17"
                  </th>
                  <td className="px-6 py-4">Silver</td>
                  <td className="px-6 py-4">Laptop</td>
                  <td className="px-6 py-4">$2999</td>
                </tr>
                <tr className="border-b bg-gray-50  ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    Microsoft Surface Pro
                  </th>
                  <td className="px-6 py-4">White</td>
                  <td className="px-6 py-4">Laptop PC</td>
                  <td className="px-6 py-4">$1999</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;
