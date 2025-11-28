
import ProceduresList from '@/components/ProceduresList';
import { getProcedures } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import type { Procedure } from '@/lib/types';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

function ProceduresListSkeleton() {
  return (
    <Card>
        <CardHeader>
             <Skeleton className="h-8 w-1/2" />
             <Skeleton className="h-4 w-3/4" />
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="flex flex-col">
                    <CardHeader className="p-0">
                        <Skeleton className="rounded-t-lg aspect-video" />
                    </CardHeader>
                    <CardContent className="p-4 flex-1">
                        <Skeleton className="h-5 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full" />
                    </CardContent>
                    <CardFooter className="p-4 flex justify-between items-center mt-auto">
                        <Skeleton className="h-8 w-1/3" />
                        <Skeleton className="h-10 w-24" />
                    </CardFooter>
                </Card>
            ))}
            </div>
        </CardContent>
    </Card>
  )
}

async function ProceduresData() {
  const procs = await getProcedures();
  const customOrder = [
    'Manicure Simples',
    'Alongamento em Fibra de Vidro',
    'Esmaltação em Gel',
    'Spa dos Pés',
    'Nail Art Decorada',
    'Manutenção de Alongamento'
  ];

  const sortedProcedures = procs.sort((a, b) => {
    const indexA = customOrder.indexOf(a.name);
    const indexB = customOrder.indexOf(b.name);

    if (indexA === -1 && indexB === -1) return a.name.localeCompare(b.name);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    
    return indexA - indexB;
  });

  return <ProceduresList procedures={sortedProcedures} />;
}

export default function ProcedimentosPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<ProceduresListSkeleton />}>
        <ProceduresData />
      </Suspense>
    </div>
  );
}
