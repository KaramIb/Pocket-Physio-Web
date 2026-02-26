"use client";

import { useState } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PatientHeader } from "@/components/patient/patient-header";
import { ProgramCard } from "@/components/patient/program-card";
import { PatientStats } from "@/components/patient/patient-stats";
import { PainChart } from "@/components/patient/pain-chart";
import { Timeline } from "@/components/patient/timeline";
import { MessagesView } from "@/components/patient/messages-view";
import { NotesSection } from "@/components/patient/notes-section";
import { ReminderSettings } from "@/components/patient/reminder-settings";
import { ActionBar } from "@/components/patient/action-bar";
import { RecentBarriers } from "@/components/patient/recent-barriers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPatientById, getTimelineForPatient } from "@/lib/data";

export default function PatientDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [activeTab, setActiveTab] = useState("overview");

  const patient = getPatientById(id);

  if (!patient) {
    notFound();
  }

  const timeline = getTimelineForPatient(id);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>

      {/* Patient Header */}
      <section className="mb-6">
        <PatientHeader patient={patient} />
      </section>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-24">
        <TabsList className="mb-6 w-full justify-start border-b border-border bg-transparent p-0">
          <TabsTrigger
            value="overview"
            className="rounded-none border-b-2 border-transparent px-4 py-2.5 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="timeline"
            className="rounded-none border-b-2 border-transparent px-4 py-2.5 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Timeline
          </TabsTrigger>
          <TabsTrigger
            value="messages"
            className="rounded-none border-b-2 border-transparent px-4 py-2.5 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Messages
          </TabsTrigger>
          <TabsTrigger
            value="notes"
            className="rounded-none border-b-2 border-transparent px-4 py-2.5 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Notes
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 mt-0">
          {/* Program Card */}
          <ProgramCard patient={patient} />

          {/* Stats Row + Pain Chart */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <PatientStats patient={patient} />
            </div>
            <div className="lg:col-span-1">
              <PainChart painHistory={patient.painHistory} />
            </div>
          </div>

          {/* Recent Barriers */}
          <RecentBarriers barriers={patient.barriers} />

          {/* Reminder Settings */}
          <ReminderSettings patient={patient} />

          {/* Recent Timeline (Limited) */}
          <div>
            <Timeline entries={timeline.slice(0, 5)} />
            {timeline.length > 5 && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => setActiveTab("timeline")}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  View full timeline ({timeline.length} entries)
                </button>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="mt-0">
          <Timeline entries={timeline} />
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages" className="mt-0">
          <MessagesView patient={patient} />
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes" className="mt-0">
          <NotesSection patient={patient} />
        </TabsContent>
      </Tabs>

      {/* Action Bar */}
      <ActionBar patient={patient} />
    </div>
  );
}
