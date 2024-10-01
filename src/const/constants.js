// export const API_URL = "http://localhost:8080";
// export const API_URL = "https://proxy.cors.sh/" + "http://13.50.26.213:8080";
// export const API_URL =
// "https://cors-anywhere.herokuapp.com/" + "http://13.50.26.213:8080";
// export const API_URL = "http://24.144.69.54:8080/api/v1";
// export const API_URL = "http://170.64.251.113:8080/api/v1";
// export const API_URL = "http://localhost:8080/api/v1";

import { format } from "date-fns";

// export const API_URL = "https://kothar.samyakluitel.com/api/v1";
export const API_URL = "https://kothar.samyakluitel.com/api/v1";

export const currency = "$";

export const visaTabs = [
  { label: "All", value: "All" },
  { label: "TR Visa", value: "TR" },
  { label: "Student Visa", value: "Student" },
  { label: "Dependent Visa", value: "Dependent" },
  { label: "Visitor/Tourist Visa", value: "Visitor/Tourist" },
];

export const insurance_companies = [
  { label: "Medibank", value: "Medibank" },
  { label: "Allianz Care", value: "Allianz Care" },
  { label: "BUPA", value: "BUPA" },
  { label: "nib Health Insurance", value: "nib Health Insurance" },
  { label: "ahm Health Insurance", value: "ahm Health Insurance" },
];
export const insurance_cover_type = [
  { label: "Single", value: "Single" },
  { label: "Couple", value: "Couple" },
  { label: "Family", value: "Family" },
  { label: "Single Parent ", value: "Single Parent" },
];
export const states = [
  { label: "New South Wales", value: "New South Wales" },
  { label: "Victoria", value: "Victoria" },
  { label: "Queensland", value: "Queensland" },
  { label: "Western Australia", value: "Western Australia" },
  { label: "South Australia", value: "South Australia" },
  { label: "Tasmania", value: "Tasmania" },
];
export const months = [
  {
    label: "Jan",
    value: "Jan",
  },
  {
    label: "Feb",
    value: "Feb",
  },
  {
    label: "March",
    value: "March",
  },
  {
    label: "April",
    value: "April",
  },
  {
    label: "May",
    value: "May",
  },
  {
    label: "June",
    value: "June",
  },
  {
    label: "July",
    value: "July",
  },
  {
    label: "Aug",
    value: "Aug",
  },
  {
    label: "Sept",
    value: "Sept",
  },
  {
    label: "Oct",
    value: "Oct",
  },
  {
    label: "Nov",
    value: "Nov",
  },
  {
    label: "Dec",
    value: "Dec",
  },
];
//  GTE applied, GtE approved, Gte Rejeected, Applied for COE, COE Receive, VISA Applied, Admission Successful

export const student_status = [
  { label: "Offer Letter Applied", value: "offer_letter_applied" },
  { label: "Offer Letter Received", value: "offer_letter_received" },
  { label: "GTE Applied", value: "gte_applied" },
  { label: "GTE Approved", value: "gte_approved" },
  { label: "GTE Rejected", value: "gte_rejected" },
  { label: "COE Applied", value: "coe_applied" },
  { label: "COE Rejected", value: "coe_rejected" },
  { label: "COE Received", value: "coe_rejected" },
  { label: "Visa Applied", value: "visa_applied" },
  { label: "Visa Granted", value: "visa_granted" },
  { label: "Visa Rejected", value: "visa_rejected" },
  { label: "Admission SUccessful", value: "admission Successful" },
];

export const monthsForFilter = [
  { label: "January", value: "January" },
  { label: "February", value: "February" },
  { label: "March", value: "March" },
  { label: "April", value: "April" },
  { label: "May", value: "May" },
  { label: "June", value: "June" },
  { label: "July", value: "July" },
  { label: "August", value: "August" },
  { label: "September", value: "September" },
  { label: "October", value: "October" },
  { label: "November", value: "November" },
  { label: "December", value: "December" },
];
export const rpl_status = [
  {
    label: "Incomplete Application",
    value: "Incomplete Application",
  },
  {
    label: "Application Ready",
    value: "Application Ready",
  },
  {
    label: "Placement Waiting",
    value: "Placement Waiting",
  },
  {
    label: "Placement Processing",
    value: "Placement Processing",
  },
  { label: "Ready To Apply", value: "Ready To Apply" },
  {
    label: "Certificate Processing",
    value: "Certificate Processing",
  },
  {
    label: "Certificate Ready",
    value: "Certificate Ready",
  },
  {
    label: "Payment Completed",
    value: "Payment Completed",
  },
  { label: "Softcopy sent", value: "Softcopy sent" },
  { label: "Hardcopy sent", value: "Hardcopy sent" },
];

export const documentForPlacement = [
  {
    label: "Covid Vaccination Certificate (Australian Converted)",
    value: "covid",
  },
  { label: "Flu Vaccination", value: "flu" },
  { label: "Police Check", value: "police_check" },
  { label: "NDIS Worker Check(if Asked)", value: "ndis" },
  { label: "WWVP( For Canberra Client only)", value: "wwvp" },
  {
    label:
      "NHHI Certificate (from the link available on Handbook Provided By Us)",
    value: "nhhi",
  },
  {
    label:
      "NDIS Worker orientation (from the link available on Handbook Provided By Us)",
    value: "ndis",
  },
];

export const studentInitialValue = {
  client: "",
  course: "",
  university: "",
  startDate: format(new Date(), "yyyy-MM-dd"),
  endDate: format(new Date(), "yyyy-MM-dd"),
  totalFees: 0,
  agreedFees: 0,
  discount: 0,
  materialFee: 0,
  enrolmentFee: 0,
  semester: 0,
  perSemFee: 0,
};
