
import { getBookings } from '@/lib/firebase';
import type { Booking } from '@/lib/types';
import DynamicAgendaView from './DynamicAgendaView';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import React from 'react';

export const dynamic = 'force-dynamic';

// We need a client component to handle the refetching logic
const ClientDynamicAgenda = (props: { initialBookings: Booking[] }) => {
    "use client";
    const [bookings, setBookings] = React.useState(props.initialBookings);
    const onBookingUpdate = async () => {
        const updatedBookings = await getBookings();
        setBookings(updatedBookings);
    };

    return <DynamicAgendaView initialBookings={bookings} onBookingUpdate={onBookingUpdate} />;
};


async function DynamicAgendaData() {
    const bookings = await getBookings();
    return <ClientDynamicAgenda initialBookings={bookings} />;
}

export default function DynamicAgendaPage() {

  return (
    <div className="space-y-6">
        <Suspense fallback={<div className="flex h-64 w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
            <DynamicAgendaData />
       </Suspense>
    </div>
  );
}
