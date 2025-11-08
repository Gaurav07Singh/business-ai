'use client';

import { useRouter } from 'next/navigation';
import ProductsSection from '../components/ProductsSection';

export default function GetStartedPage() {
  const router = useRouter();

  const handleServiceSelect = (service) => {
    router.push(`/get-started/${service}`);
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <ProductsSection 
      onServiceSelect={handleServiceSelect}
      onBack={handleBack}
    />
  );
}
