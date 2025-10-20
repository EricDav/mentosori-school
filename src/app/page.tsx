import HeroSection from '@/components/home/hero-section';
import AboutSection from '@/components/home/about-section';
import NewsSection from '@/components/home/news-section';
import ContactSection from '@/components/home/contact-section';
import GallerySection from '@/components/home/gallery-section';
import CalendarSection from '@/components/home/calendar-section';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <AboutSection />
      <GallerySection />
      <NewsSection />
      <CalendarSection />
      <ContactSection />
    </div>
  );
}
