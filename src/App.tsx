import { useState } from 'react';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhatMuni from '@/components/WhatMuni';
import Personalize from '@/components/Personalize';
import Configurator from '@/components/Configurator';
import DonateClothes from '@/components/DonateClothes';
import WhyMuni from '@/components/WhyMuni';
import Pricing from '@/components/Pricing';
import HowItWorks from '@/components/HowItWorks';
import Impact from '@/components/Impact';
import Creators from '@/components/Creators';
import FAQ from '@/components/FAQ';
import Checkout from '@/components/Checkout';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import Catalog from '@/components/Catalog';
import ProductDetail from '@/components/ProductDetail';
import type { Doll } from '@/data/catalog';

function App() {
  const [selectedDoll, setSelectedDoll] = useState<Doll | null>(null);

  return (
    <CartProvider>
      <div className="min-h-screen bg-cream-100">
        <Navbar />
        <main>
          <Hero />
          <WhatMuni />
          <Personalize />
          <Configurator />
          <DonateClothes />
          <WhyMuni />
          <Pricing />
          <HowItWorks />
          <Impact />
          <Creators />
          <FAQ />
          <Checkout />
          <Catalog onSelectDoll={setSelectedDoll} />
          <FinalCTA />
        </main>
        <Footer />
        <CartDrawer />
        <ProductDetail
          doll={selectedDoll}
          onClose={() => setSelectedDoll(null)}
        />
      </div>
    </CartProvider>
  );
}

export default App;
