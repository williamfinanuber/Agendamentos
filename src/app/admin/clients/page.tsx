
import { getBookings } from '@/lib/firebase';
import type { Booking } from '@/lib/types';
import ClientsPageClient from './ClientsPageClient';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

interface Client {
  name: string;
  contact: string;
  birthDate?: string;
}

function getUniqueClients(bookings: Booking[]): Client[] {
  const clientsMap = new Map<string, Client>();
  bookings.forEach(booking => {
    const key = booking.clientContact || booking.clientName;
    if (!key) return; 

    // Prioritize entries with birthdate
    if (!clientsMap.has(key) || (booking.clientBirthDate && !clientsMap.get(key)?.birthDate)) {
      clientsMap.set(key, {
        name: booking.clientName,
        contact: booking.clientContact,
        birthDate: booking.clientBirthDate,
      });
    }
  });
  return Array.from(clientsMap.values());
}

async function ClientsPageContent() {
  const allBookings = await getBookings();
  const uniqueClients = getUniqueClients(allBookings);
  return <ClientsPageClient clients={uniqueClients} />;
}


export default function ClientsPage() {
    return (
        <Suspense fallback={<div className="flex h-64 w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
            <div className="space-y-6">
                <ClientsPageContent />
            </div>
        </Suspense>
    )
}
