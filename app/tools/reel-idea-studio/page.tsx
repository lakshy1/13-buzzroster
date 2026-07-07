import type { Metadata } from "next";
import ReelIdeaStudioPage from "./ReelIdeaStudioPage";

export const metadata: Metadata = {
  title: "Reel Idea Studio | Buzzroster",
  description: "Generate creator-ready reel ideas with hooks, scripts, and brand-fit angles.",
};

export default function Page() {
  return <ReelIdeaStudioPage />;
}
