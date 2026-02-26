import Link from "next/link";
import { ArrowLeft, UserX } from "lucide-react";
import { Header } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function PatientNotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-secondary">
      <Header />

      <main className="mx-auto flex w-full max-w-4xl flex-1 items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <UserX className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="text-xl font-semibold text-foreground">
            Patient not found
          </h1>
          <p className="mt-2 text-muted-foreground">
            The patient you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Button asChild className="mt-6">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </Card>
      </main>
    </div>
  );
}
