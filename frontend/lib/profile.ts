export type StudentProfile = {
  name: string;
  city: string;
  phone: string;
  score_10th: number;
  score_12th: number;
  college: string;
  cgpa: number;
  grad_year: number;
  country: string;
  course: string;
  budget_lakhs: number;
  gre: number;
  ielts: number;
  family_income: string;
  co_applicant: boolean;
  collateral: boolean;
  loan_readiness_score: number;
  xp: number;
  streak: number;
  level: string;
};

export const DEMO_PROFILE: StudentProfile = {
  name: "Arjun Mehta",
  city: "Pune",
  phone: "9876543210",
  score_10th: 91,
  score_12th: 88,
  college: "VIT Vellore",
  cgpa: 8.2,
  grad_year: 2024,
  country: "USA",
  course: "MS Computer Science",
  budget_lakhs: 40,
  gre: 320,
  ielts: 7.5,
  family_income: "₹6L-₹10L",
  co_applicant: true,
  collateral: false,
  loan_readiness_score: 74,
  xp: 840,
  streak: 12,
  level: "Scholar"
};

export const indianMoney = (lakhs: number) => {
  const value = lakhs * 100000;
  return new Intl.NumberFormat("en-IN").format(value);
};
