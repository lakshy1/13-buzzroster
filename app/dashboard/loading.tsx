export default function DashboardLoading() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(255,226,197,0.72),transparent_26%),radial-gradient(circle_at_top_right,rgba(227,220,255,0.82),transparent_30%),linear-gradient(180deg,#fffdfa_0%,#f8f3ec_100%)] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
      <div className="mx-auto max-w-[1320px] rounded-[2rem] border border-white/70 bg-white/72 p-6 shadow-[0_24px_55px_rgba(118,93,202,0.08)]">
        <div className="h-7 w-52 rounded-full bg-[#f1eaff]" />
        <div className="mt-4 h-14 w-full max-w-[34rem] rounded-[1.5rem] bg-[#f7f3ff]" />
        <div className="mt-3 h-6 w-full max-w-[28rem] rounded-full bg-[#f8f3ec]" />
        <div className="mt-8 grid gap-4 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-44 rounded-[1.8rem] bg-[#fbf9ff]" />
          ))}
        </div>
      </div>
    </main>
  );
}
