import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>
      <h1 className="mb-6 text-2xl font-semibold text-foreground">Settings</h1>

      {/* Profile Settings */}
      <Card className="mb-6 p-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Profile</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue="Dr. Jane Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="jane.doe@clinic.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clinic">Clinic Name</Label>
            <Input id="clinic" defaultValue="City Physiotherapy Clinic" />
          </div>
          <Button>Save Changes</Button>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="mb-6 p-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Notifications
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Safety Flag Alerts</p>
              <p className="text-sm text-muted-foreground">
                Get notified immediately when a patient flags a safety concern
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Silent Patient Alerts</p>
              <p className="text-sm text-muted-foreground">
                Get notified when a patient hasn&apos;t responded in 3+ days
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Daily Summary Email</p>
              <p className="text-sm text-muted-foreground">
                Receive a daily email summary of patient activity
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </Card>
    </div>
  );
}
