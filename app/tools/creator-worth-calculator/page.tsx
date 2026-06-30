import type { Metadata } from "next";
import CreatorWorthCalculatorPage from "./CreatorWorthCalculatorPage";

export const metadata: Metadata = {
  title: "Creator Worth Calculator | Buzzroster",
  description: "Estimate creator earnings with Buzzroster's free creator worth calculator.",
};

export default function Page() {
  return <CreatorWorthCalculatorPage />;
}
