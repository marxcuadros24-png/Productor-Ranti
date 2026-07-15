import DashboardContent from '@/components/DashboardContent';
import { productorUno } from '@/lib/productor-data';

export default function Home() {
  return <DashboardContent productor={productorUno} />;
}
