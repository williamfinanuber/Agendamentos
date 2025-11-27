
import { getTransactions, getCategories, getBookings } from '@/lib/firebase';
import FinancePageClient from './FinancePageClient';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import type { Transaction, Category, Booking } from '@/lib/types';

export const dynamic = 'force-dynamic';

async function FinanceData() {
    const [initialTransactions, initialCategories, initialBookings] = await Promise.all([
      getTransactions(),
      getCategories(),
      getBookings(),
    ]);

    return (
        <FinancePageClient 
            initialTransactions={initialTransactions} 
            initialCategories={initialCategories}
            initialBookings={initialBookings}
        />
    );
}

export default function FinancePage() {
  return (
    <div className="space-y-6">
        <Suspense fallback={<div className="flex h-64 w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
            <FinanceData />
        </Suspense>
    </div>
  );
}
