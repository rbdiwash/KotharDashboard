import useKothar from "context/useKothar";
import React from "react";
import { Link } from "react-router-dom";

export default function CardPageVisits() {
  const [
    { skillList, clientList, studentList, insuranceList, visaList, rplList },
    {},
  ] = useKothar();

  const className =
    "border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left";
  const tableHeadClass =
    "px-6 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-2 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left";
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-2 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-0 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-slate-700">
                Pending Documents
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className={tableHeadClass}>Type</th>
                <th className={tableHeadClass}>Total</th>
                <th className={tableHeadClass}>Pending</th>
                <th className={tableHeadClass}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className={className}>Clients</th>
                <td className={className}>{clientList?.length}</td>
                <td className={className}>
                  {
                    clientList?.filter((item) => item?.status === "pending")
                      ?.length
                  }
                </td>
                <td className={className}>
                  <Link to="/admin/client">
                    <button
                      className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1  ease-linear transition-all duration-150"
                      type="button"
                    >
                      See all
                    </button>
                  </Link>
                </td>
              </tr>
              <tr>
                <th className={className}>RPL Certificate</th>
                <td className={className}>{rplList?.length}</td>
                <td className={className}>
                  {
                    rplList?.filter((item) => item?.status === "pending")
                      ?.length
                  }
                </td>
                <td className={className}>
                  <Link to="/admin/rpl-certificate">
                    <button
                      className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1  ease-linear transition-all duration-150"
                      type="button"
                    >
                      See all
                    </button>
                  </Link>
                </td>
              </tr>
              <tr>
                <th className={className}>Student Admission</th>
                <td className={className}>{studentList?.length}</td>
                <td className={className}>
                  {
                    studentList?.filter((item) => item?.status === "pending")
                      ?.length
                  }
                </td>
                <td className={className}>
                  <Link to="/admin/student">
                    <button
                      className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1  ease-linear transition-all duration-150"
                      type="button"
                    >
                      See all
                    </button>
                  </Link>
                </td>
              </tr>
              <tr>
                <th className={className}>Visa</th>
                <td className={className}>{visaList?.length}</td>
                <td className={className}>
                  {
                    visaList?.filter((item) => item?.status === "pending")
                      ?.length
                  }
                </td>
                <td className={className}>
                  <Link to="/admin/visa">
                    <button
                      className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1  ease-linear transition-all duration-150"
                      type="button"
                    >
                      See all
                    </button>
                  </Link>
                </td>
              </tr>
              <tr>
                <th className={className}>Insurance</th>
                <td className={className}>{insuranceList?.length ?? 0}</td>
                <td className={className}>
                  {
                    insuranceList?.filter((item) => item?.status === "pending")
                      ?.length
                  }
                </td>
                <td className={className}>
                  <Link to="/admin/insurance">
                    <button
                      className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1  ease-linear transition-all duration-150"
                      type="button"
                    >
                      See all
                    </button>
                  </Link>
                </td>
              </tr>
              <tr>
                <th className={className}>Skill Assessment</th>
                <td className={className}>{skillList?.length}</td>
                <td className={className}>
                  {
                    skillList?.filter((item) => item?.status === "pending")
                      ?.length
                  }
                </td>
                <td className={className}>
                  <Link to="/admin/skill-assessment">
                    <button
                      className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1  ease-linear transition-all duration-150"
                      type="button"
                    >
                      See all
                    </button>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
