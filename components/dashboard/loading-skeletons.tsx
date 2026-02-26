import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function StatsRowSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="p-4 overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <Skeleton className="h-9 w-16 animate-pulse" />
              <Skeleton className="h-4 w-24 animate-pulse" />
            </div>
            <Skeleton className="h-10 w-10 rounded-lg animate-pulse" />
          </div>
        </Card>
      ))}
    </div>
  );
}

export function PatientCardSkeleton() {
  return (
    <Card className="p-4 overflow-hidden">
      <div className="flex gap-4">
        <Skeleton className="h-12 w-12 rounded-full shrink-0 animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-32 animate-pulse" />
            <Skeleton className="h-4 w-20 animate-pulse" />
          </div>
          <Skeleton className="h-4 w-24 animate-pulse" />
          <Skeleton className="h-8 w-48 animate-pulse" />
        </div>
        <div className="flex items-start gap-2">
          <Skeleton className="h-8 w-20 animate-pulse" />
          <Skeleton className="h-8 w-16 animate-pulse" />
        </div>
      </div>
    </Card>
  );
}

export function NeedsAttentionSectionSkeleton() {
  return (
    <section className="space-y-4">
      <Skeleton className="h-12 w-full rounded-lg animate-pulse" />
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <PatientCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}

export function OnTrackSectionSkeleton() {
  return (
    <section className="space-y-4">
      <Skeleton className="h-12 w-full rounded-lg animate-pulse" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="p-4 overflow-hidden">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full animate-pulse" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-24 animate-pulse" />
                <Skeleton className="h-3 w-16 animate-pulse" />
              </div>
            </div>
            <div className="mt-3 space-y-2">
              <Skeleton className="h-2 w-full rounded-full animate-pulse" />
              <div className="flex justify-between">
                <Skeleton className="h-3 w-16 animate-pulse" />
                <Skeleton className="h-3 w-12 animate-pulse" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function PatientTableSkeleton() {
  return (
    <Card className="overflow-hidden">
      {/* Header */}
      <div className="border-b border-border bg-muted/30 p-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-24 animate-pulse" />
          <div className="flex gap-2">
            <Skeleton className="h-4 w-16 animate-pulse" />
            <Skeleton className="h-4 w-16 animate-pulse" />
            <Skeleton className="h-4 w-20 animate-pulse" />
          </div>
        </div>
      </div>
      {/* Rows */}
      <div className="divide-y divide-border">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4">
            <Skeleton className="h-4 w-4 animate-pulse" />
            <Skeleton className="h-8 w-8 rounded-full animate-pulse" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-4 w-32 animate-pulse" />
              <Skeleton className="h-3 w-24 animate-pulse" />
            </div>
            <Skeleton className="h-6 w-16 rounded-full animate-pulse" />
            <Skeleton className="h-2 w-24 rounded-full animate-pulse" />
            <Skeleton className="h-4 w-12 animate-pulse" />
            <Skeleton className="h-4 w-20 animate-pulse" />
            <Skeleton className="h-8 w-8 animate-pulse" />
          </div>
        ))}
      </div>
    </Card>
  );
}

export function TimelineSkeleton() {
  return (
    <Card className="p-4 overflow-hidden">
      <Skeleton className="mb-6 h-6 w-36 animate-pulse" />
      
      {/* Date group */}
      <div className="space-y-6">
        {[...Array(2)].map((_, groupIndex) => (
          <div key={groupIndex}>
            <div className="mb-4 flex items-center gap-3">
              <Skeleton className="h-4 w-20 animate-pulse" />
              <Skeleton className="h-px flex-1" />
            </div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-4 pl-4">
                  <Skeleton className="h-8 w-8 rounded-full shrink-0 animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-32 animate-pulse" />
                      <Skeleton className="h-3 w-16 animate-pulse" />
                    </div>
                    <Skeleton className="h-4 w-48 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function PainChartSkeleton() {
  return (
    <Card className="p-4 overflow-hidden">
      <Skeleton className="mb-4 h-5 w-32 animate-pulse" />
      <Skeleton className="h-48 w-full animate-pulse rounded-lg" />
      <div className="mt-4 flex justify-between">
        <Skeleton className="h-4 w-20 animate-pulse" />
        <Skeleton className="h-4 w-24 animate-pulse" />
      </div>
    </Card>
  );
}

export function PatientDetailSkeleton() {
  return (
    <div className="space-y-6">
      {/* Back link */}
      <Skeleton className="h-4 w-32 animate-pulse" />

      {/* Patient Header */}
      <div className="flex items-start gap-4">
        <Skeleton className="h-16 w-16 rounded-full animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-7 w-48 animate-pulse" />
            <Skeleton className="h-5 w-16 rounded-full animate-pulse" />
          </div>
          <Skeleton className="h-4 w-64 animate-pulse" />
          <Skeleton className="h-4 w-40 animate-pulse" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-border pb-2">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-8 w-20 animate-pulse" />
        ))}
      </div>

      {/* Program Card */}
      <Card className="p-4 overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-5 w-48 animate-pulse" />
            <Skeleton className="h-4 w-36 animate-pulse" />
          </div>
          <Skeleton className="h-4 w-24 animate-pulse" />
        </div>
        <Skeleton className="mt-4 h-2 w-full rounded-full animate-pulse" />
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-4 overflow-hidden">
            <Skeleton className="h-8 w-16 animate-pulse" />
            <Skeleton className="mt-1 h-4 w-20 animate-pulse" />
          </Card>
        ))}
      </div>

      {/* Timeline Preview */}
      <TimelineSkeleton />
    </div>
  );
}

export function ActivityFeedSkeleton() {
  return (
    <Card className="p-4 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-5 w-28 animate-pulse" />
        <Skeleton className="h-4 w-16 animate-pulse" />
      </div>
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-start gap-3">
            <Skeleton className="h-8 w-8 rounded-full shrink-0 animate-pulse" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-4 w-40 animate-pulse" />
              <Skeleton className="h-3 w-24 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
