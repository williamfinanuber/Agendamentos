
import { getBookings, getProcedures, getAvailability } from '@/lib/firebase';
import AgendaView from './AgendaView';
import type { Booking, Procedure, Availability } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Suspense } from 'react';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function AgendaData() {
  const [allBookings, procedures, availability] = await Promise.all([
    getBookings(),
    getProcedures(),
    getAvailability()
  ]);
  
  const filteredBookings = allBookings.filter((booking: Booking) => booking.status === 'confirmed' || booking.status === 'completed');

  return <AgendaView initialBookings={filteredBookings} procedures={procedures} initialAvailability={availability} />;
}

export default function AgendaPage() {
  
  return (
    <div className="space-y-6">
       <Suspense fallback={<div className="flex h-64 w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
        <AgendaData />
       </Suspense>
    </div>
  );
}
