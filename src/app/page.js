import ProducerDashboard from '@/components/ProducerDashboard';
import { productorUno } from '@/lib/productor-data';

export default function Home() {
  return <ProducerDashboard productor={productorUno} />;
}
