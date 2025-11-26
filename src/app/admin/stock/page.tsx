
import { getProducts, getStockCategories } from '@/lib/firebase';
import StockClientPage from './StockClientPage';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import type { Product, StockCategory } from '@/lib/types';

async function StockData() {
    const [initialProducts, initialCategories] = await Promise.all([
        getProducts(),
        getStockCategories(),
    ]);

    return (
        <StockClientPage 
            initialProducts={initialProducts} 
            initialCategories={initialCategories}
        />
    );
}

export default function StockPage() {

  return (
    <div className="space-y-6">
        <Suspense fallback={<div className="flex h-64 w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
            <StockData />
        </Suspense>
    </div>
  );
}
