import ProducerProfile from '@/components/ProducerProfile';
import {
  productorUno,
  stats,
  products,
  animals,
  activities,
} from '@/lib/productor-data';

export default function ProductorPage({ params }) {
  const { id } = params;

  return (
    <ProducerProfile
      productor={productorUno}
      stats={stats}
      products={products}
      animals={animals}
      activities={activities}
    />
  );
}
