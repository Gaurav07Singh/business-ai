'use client';

import { useRouter, useParams } from 'next/navigation';
import QuizInterface from '../../components/QuizInterface';
import ImageGenerator from '../../components/ImageGenerator';

export default function ServicePage() {
  const router = useRouter();
  const params = useParams();
  const service = params.service;

  const handleBack = () => {
    router.push('/get-started');
  };

  // Render ImageGenerator for image-generator service
  if (service === 'image-generator') {
    return <ImageGenerator onBack={handleBack} />;
  }

  // Render QuizInterface for other services
  return (
    <QuizInterface 
      service={service}
      onBack={handleBack}
    />
  );
}
