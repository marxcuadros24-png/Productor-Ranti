'use client';

import { useState, useEffect, useCallback } from 'react';
import ProducerDashboard from './ProducerDashboard';
import {
  getSavedProducts,
  getProductCount,
  savedProductsToActivities,
} from '@/lib/product-service';
import { products as staticProducts } from '@/lib/productor-data';

export default function DashboardContent({ productor }) {
  const [savedProducts, setSavedProducts] = useState(getSavedProducts());
  const [savedActivities, setSavedActivities] = useState(savedProductsToActivities(5));

  const loadData = useCallback(() => {
    setSavedProducts(getSavedProducts());
    setSavedActivities(savedProductsToActivities(5));
  }, []);

  useEffect(() => {
    loadData();

    // Listen for new products saved from other pages
    window.addEventListener('product-saved', loadData);
    return () => window.removeEventListener('product-saved', loadData);
  }, [loadData]);

  const totalProductCount = getProductCount(staticProducts.length);

  return (
    <ProducerDashboard
      productor={productor}
      savedProducts={savedProducts}
      savedActivities={savedActivities}
      dynamicProductCount={totalProductCount}
    />
  );
}
