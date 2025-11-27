
import { getBookings } from '@/lib/firebase';
import type { Booking } from '@/lib/types';
import MaintenanceClientPage from './MaintenanceClientPage';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function MaintenanceData() {
    const allBookings = await getBookings();
    // Filter bookings on the server side
    const filteredBookings = allBookings.filter(
      (booking: Booking) => booking.status === 'completed' && !booking.maintenanceReminderSent
    );
    return <MaintenanceClientPage initialBookings={filteredBookings} />;
}

export default function MaintenancePage() {
  
  return (
    <div className="space-y-6">
        <Suspense fallback={<div className="flex h-64 w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
            <MaintenanceData />
        </Suspense>
    </div>
  );
}
