'use client';

import { useState, useEffect, useCallback } from 'react';
import ProducerDashboard from './ProducerDashboard';
import {
  getSavedProducts,
  getProductCount,
  savedProductsToActivities,
} from '@/lib/product-service';
import {
  getSavedAnimals,
  savedAnimalsToActivities,
} from '@/lib/animal-service';
import { products as staticProducts } from '@/lib/productor-data';

export default function DashboardContent({ productor }) {
  const [savedProducts, setSavedProducts] = useState(getSavedProducts());
  const [savedAnimals, setSavedAnimals] = useState(getSavedAnimals());
  const [savedActivities, setSavedActivities] = useState([
    ...savedProductsToActivities(5),
    ...savedAnimalsToActivities(5),
  ]);

  const loadData = useCallback(() => {
    setSavedProducts(getSavedProducts());
    setSavedAnimals(getSavedAnimals());
    setSavedActivities([
      ...savedProductsToActivities(5),
      ...savedAnimalsToActivities(5),
    ]);
  }, []);

  useEffect(() => {
    loadData();

    window.addEventListener('product-saved', loadData);
    window.addEventListener('animal-saved', loadData);
    return () => {
      window.removeEventListener('product-saved', loadData);
      window.removeEventListener('animal-saved', loadData);
    };
  }, [loadData]);

  const totalProductCount = getProductCount(staticProducts.length);

  return (
    <ProducerDashboard
      productor={productor}
      savedProducts={savedProducts}
      savedAnimals={savedAnimals}
      savedActivities={savedActivities}
      dynamicProductCount={totalProductCount}
    />
  );
}
