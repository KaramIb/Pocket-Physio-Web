import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/dashboard/header";
import { PatientDetailSkeleton } from "@/components/dashboard/loading-skeletons";
import { Button } from "@/components/ui/button";

export default function PatientDetailLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-secondary">
      <Header />

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <Button variant="ghost" asChild className="mb-4 -ml-2">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>

        <PatientDetailSkeleton />
      </main>
    </div>
  );
}
