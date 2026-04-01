import { NewsCarousel, fetchNews } from "./news/carousel";
import Link from "next/link";

interface HomeProps {
  searchParams: Promise<{ mockCount?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const mockCount =
    params.mockCount !== undefined ? Number(params.mockCount) : undefined;

  const data = await fetchNews(mockCount);

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {/* News Section */}
        {data.data.items.length > 0 && (
          <section className="space-y-4">
            <NewsCarousel items={data.data.items} />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-zinc-50 dark:bg-zinc-950">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © 2026 TechCorp. Seluruh hak cipta dilindungi.
          </p>
        </div>
      </footer>
    </div>
  );
}
