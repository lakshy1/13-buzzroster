import { redirect } from "next/navigation";

export default function LegacyDashboardCampaignsPage() {
  redirect("/creator/campaigns");
}
