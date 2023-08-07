import React from 'react'

const WorkExperience = () => {
  return (
    <div>
      <div className="my-4 grid grid-cols-12 gap-4">
        <div className="col-span-3 sub-heading mt-0">Work Experience</div>
        <div className="col-span-9">
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 ">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50  ">
                <tr>
                  <th scope="col" class="px-6 py-5 text-base">
                    Name of Organization
                  </th>
                  <th scope="col" class="px-6 py-5 text-base">
                    From
                  </th>
                  <th scope="col" class="px-6 py-5 text-base">
                    To
                  </th>
                  <th scope="col" class="px-6 py-5 text-base">
                    Document Uploaded
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white border-b ">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    Apple MacBook Pro 17"
                  </th>
                  <td class="px-6 py-4">Silver</td>
                  <td class="px-6 py-4">Laptop</td>
                  <td class="px-6 py-4">$2999</td>
                </tr>
                <tr class="border-b bg-gray-50  ">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    Microsoft Surface Pro
                  </th>
                  <td class="px-6 py-4">White</td>
                  <td class="px-6 py-4">Laptop PC</td>
                  <td class="px-6 py-4">$1999</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkExperience