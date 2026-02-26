import { Header } from "@/components/dashboard/header";
import {
  StatsRowSkeleton,
  NeedsAttentionSectionSkeleton,
  OnTrackSectionSkeleton,
} from "@/components/dashboard/loading-skeletons";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-secondary">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="mb-8">
          <StatsRowSkeleton />
        </section>

        <div className="mb-8">
          <NeedsAttentionSectionSkeleton />
        </div>

        <div className="mb-24">
          <OnTrackSectionSkeleton />
        </div>
      </main>
    </div>
  );
}
