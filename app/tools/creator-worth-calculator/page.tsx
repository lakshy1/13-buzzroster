import type { Metadata } from "next";
import CreatorWorthCalculatorPage from "./CreatorWorthCalculatorPage";

export const metadata: Metadata = {
  title: "Creator Worth Calculator | Buzzroster",
  description:
    "Estimate creator worth for Instagram and YouTube profiles with Buzzroster.",
};

export default function Page() {
  return <CreatorWorthCalculatorPage />;
}
