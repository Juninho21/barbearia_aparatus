import Image from "next/image";
export const dynamic = "force-dynamic";
import Header from "./_components/header";
import SearchInput from "./_components/search-input";
import banner from "../public/banner.png";
import { prisma } from "@/lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import Footer from "./_components/footer";
import {
  PageContainer,
  PageSection,
  PageSectionScroller,
  PageSectionTitle,
} from "./_components/ui/page";
import QuickSearchButtons from "./_components/quick-search-buttons";

const Home = async () => {
  let recommendedBarbershops: any[] = [];
  let popularBarbershops: any[] = [];

  try {
    recommendedBarbershops = await prisma.barbershop.findMany({
      orderBy: { name: "asc" },
    });
  } catch (err) {
    console.warn("Falha ao buscar barbearias recomendadas (Prisma)", err);
  }

  try {
    popularBarbershops = await prisma.barbershop.findMany({
      orderBy: { name: "desc" },
    });
  } catch (err) {
    console.warn("Falha ao buscar barbearias populares (Prisma)", err);
  }
  return (
    <main>
      <Header />
      <PageContainer>
        <SearchInput />

        <QuickSearchButtons />

        <Image
          src={banner}
          alt="Agende agora!"
          sizes="100vw"
          className="h-auto w-full"
        />

        <PageSection>
          <PageSectionTitle>Recomendados</PageSectionTitle>
          <PageSectionScroller>
            {recommendedBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </PageSectionScroller>
        </PageSection>

        <PageSection>
          <PageSectionTitle>Populares</PageSectionTitle>
          <PageSectionScroller>
            {popularBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </PageSectionScroller>
        </PageSection>
      </PageContainer>
      <Footer />
    </main>
  );
};

export default Home;
