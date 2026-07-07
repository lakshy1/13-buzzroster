import type { Metadata } from "next";
import TaxCalculatorPage from "./TaxCalculatorPage";

export const metadata: Metadata = {
  title: "Tax Calculator | Buzzroster",
  description: "Calculate GST and quick tax estimates in a premium Buzzroster-styled tool.",
};

export default function Page() {
  return <TaxCalculatorPage />;
}
