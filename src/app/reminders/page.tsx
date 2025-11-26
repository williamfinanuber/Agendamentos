

import { getBookings } from '@/lib/firebase';
import type { Booking } from '@/lib/types';
import RemindersClientPage from '../admin/reminders/RemindersClientPage';
import { Suspense } from 'react';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

async function RemindersData() {
    const allBookings = await getBookings();
    const filteredBookings = allBookings.filter((booking: Booking) => booking.status === 'confirmed');
    return <RemindersClientPage bookings={filteredBookings} />;
}


export default function RemindersPage() {

  return (
    <div className="space-y-6">
       <Card>
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Button asChild variant="outline" size="sm" className="flex-shrink-0">
                        <Link href="/admin">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Voltar
                        </Link>
                    </Button>
                    <CardTitle className="text-xl md:text-2xl">Lembretes de Horário</CardTitle>
                </div>
            </CardHeader>
            <Suspense fallback={<div className="flex h-24 w-full items-center justify-center"><Loader2 className="h-6 w-6 animate-spin" /></div>}>
                <RemindersData />
            </Suspense>
        </Card>
    </div>
  );
}
