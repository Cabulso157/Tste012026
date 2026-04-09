import { Header } from "@/components/campaign/Header";
import { HeroSection } from "@/components/campaign/HeroSection";
import { StorySection } from "@/components/campaign/StorySection";
import { SupportMessages } from "@/components/campaign/SupportMessages";
import { DonationForm } from "@/components/campaign/DonationForm";
import { DonorsCarousel } from "@/components/campaign/DonorsCarousel";
import { Footer } from "@/components/campaign/Footer";
import { OfficialModal } from "@/components/campaign/OfficialModal";

const CAMPAIGN_DATA = {
  title: "Lucas precisa de ajuda urgente!",
  organizer: "Amigos do Lucas",
  createdAt: "26/02/2026",
  goalAmount: 45800,
  raisedAmount: 16030,
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <OfficialModal enabled={true} />
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-6">
        <HeroSection
          title={CAMPAIGN_DATA.title}
          organizer={CAMPAIGN_DATA.organizer}
          createdAt={CAMPAIGN_DATA.createdAt}
        />
        <div className="space-y-6">
          <StorySection goalAmount={CAMPAIGN_DATA.goalAmount} raisedAmount={CAMPAIGN_DATA.raisedAmount} />
          <DonationForm goalAmount={CAMPAIGN_DATA.goalAmount} raisedAmount={CAMPAIGN_DATA.raisedAmount} />
          <SupportMessages />
        </div>
      </main>
      <DonorsCarousel />
      <Footer />
    </div>
  );
};

export default Index;
