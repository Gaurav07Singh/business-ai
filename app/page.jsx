'use client';

import { useRouter } from 'next/navigation';
import LandingPage from './components/LandingPage';

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/get-started');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <LandingPage onGetStarted={handleGetStarted} />
    </div>
  );
}
