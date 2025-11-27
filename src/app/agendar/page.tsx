
import BookingFlow from '@/components/BookingFlow';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { getProcedures, getAvailabilityForProcedure, getBookingById } from '@/lib/firebase';
import type { Procedure, Booking, Availability } from '@/lib/types';

export const dynamic = 'force-dynamic';

async function BookingDataLoader({ bookingId, procedureId }: { bookingId: string | undefined, procedureId: string | undefined }) {
    
    let booking: Booking | null = null;
    let finalProcedureId: string | undefined = procedureId;

    if (bookingId) {
        booking = await getBookingById(bookingId);
        if (booking) {
            finalProcedureId = booking.procedureId;
        }
    }

    if (!finalProcedureId) {
        // Handle case where no procedure can be determined
        return <BookingFlow procedures={[]} initialAvailability={{}} existingBooking={null} procedureIdParam={undefined} />;
    }

    const [procedures, availability] = await Promise.all([
        getProcedures(),
        getAvailabilityForProcedure(finalProcedureId)
    ]);
    
    return <BookingFlow procedures={procedures} initialAvailability={availability} existingBooking={booking} procedureIdParam={finalProcedureId} />;
}

interface SchedulePageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

export default function SchedulePage({ searchParams }: SchedulePageProps) {
  const bookingId = typeof searchParams.bookingId === 'string' ? searchParams.bookingId : undefined;
  const procedureId = typeof searchParams.procedureId === 'string' ? searchParams.procedureId : undefined;

  return (
    <div className="container mx-auto px-4 py-8">
       <Suspense fallback={<div className="flex justify-center items-center h-64"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>}>
        <BookingDataLoader bookingId={bookingId} procedureId={procedureId} />
      </Suspense>
    </div>
  );
}
