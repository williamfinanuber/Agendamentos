

import { getAvailabilitySettings, getAvailability, getBlockedSlots } from "@/lib/firebase";
import AvailabilityPageClient from "./AvailabilityPageClient";
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function AvailabilityData() {
  const [settingsData, availabilityData, blockedSlotsData] = await Promise.all([
    getAvailabilitySettings(),
    getAvailability(),
    getBlockedSlots()
  ]);

  return (
    <AvailabilityPageClient 
      initialSettings={settingsData} 
      initialAvailability={availabilityData} 
      initialBlockedSlots={blockedSlotsData} 
    />
  );
}


export default function AvailabilityPage() {

  return (
    <Suspense fallback={<div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
      <AvailabilityData />
    </Suspense>
  );
}
