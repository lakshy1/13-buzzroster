import type { Metadata } from "next";
import ContentPlannerPage from "./ContentPlannerPage";

export const metadata: Metadata = {
  title: "Creator Content Planner | Buzzroster",
  description: "Turn content ideas into a weekly plan, task pipeline, and reminder workflow.",
};

export default function Page() {
  return <ContentPlannerPage />;
}
