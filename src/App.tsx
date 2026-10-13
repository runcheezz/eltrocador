import { LangProvider } from '@/i18n/LangContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import MenuSection from '@/components/MenuSection';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

function App() {
  return (
    <LangProvider>
      <div className="min-h-screen bg-neutral-50">
        <Navbar />
        <main>
          <Hero />
          <About />
          <MenuSection />
          <Gallery />
          <Contact />
        </main>
        <Footer />
      </div>
    </LangProvider>
  );
}

export default App;
