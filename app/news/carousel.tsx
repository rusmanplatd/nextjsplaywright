import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { CarouselProps as NewsCarouselProps, NewsResponse } from "./types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const fetchNews = async (mockCount?: number): Promise<NewsResponse> => {
  // Allow tests to control the number of items without hitting the real API
  if (mockCount !== undefined) {
    const items = Array.from({ length: mockCount }, (_, i) => ({
      id: i + 1,
      title: `Mock News ${i + 1}`,
      summary: `This is a mock summary for news item ${i + 1}.`,
      content: `Mock content ${i + 1}`,
      imageUrl: `https://picsum.photos/seed/${i + 1}/400/225`,
      author: "Mock Author",
      category: "General",
      isActive: true,
      isPublished: true,
      startDate: "2026-01-01T00:00:00Z",
      endDate: "2026-12-31T00:00:00Z",
      publishedAt: "2026-01-01T00:00:00Z",
      createdAt: "2026-01-01T00:00:00Z",
      createdBy: 1,
      updatedAt: "2026-01-01T00:00:00Z",
      updatedBy: 1,
      deletedAt: "",
      deletedBy: 0,
    }));
    return {
      logId: "LOG-MOCK",
      success: true,
      responseCode: "200",
      responseMessage: "OK",
      version: "1.0",
      data: {
        items,
        pagination: {
          page: 1,
          limit: 10,
          totalItems: mockCount,
          totalPages: Math.ceil(mockCount / 10),
        },
      },
    };
  }

  const res = await fetch(
    "https://mock-api.tryztech.com/v1/surrounding/catalog/news/active?page=1&limit=10",
    {
      headers: {
        "AIF-LOG-ID": "LOG-1769009654028-2735AC",
        "AIF-REQUEST-TIMESTAMP": "2026-02-26T10:30:00Z",
        "AIF-CHANNEL-ID": "B2C",
        "AIF-PLATFORM": "WEB",
        "AIF-CLIENT-IP": "192.168.1.1",
        "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
      },
    },
  );
  const data: NewsResponse = await res.json();
  return data;
};

export const NewsCarousel = ({ items }: NewsCarouselProps) => {
  return (
    <div className="w-full space-y-6 py-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Berita Terbaru</h2>
          <p className="text-muted-foreground text-sm">
            Informasi terkini seputar layanan dan operasional kami.
          </p>
        </div>
        {items.length > 4 && (
          <Button
            variant="ghost"
            className="gap-2 group transition-all"
            id="btnViewAllNews"
            asChild
          >
            <Link href="/news">
              Lihat Semua
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        )}
      </div>

      <Carousel
        id="newsContainer"
        opts={{ align: "start", loop: false }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {items.slice(0, 4).map((item, index) => (
            <CarouselItem
              key={item.id}
              className="news-item pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 group h-full flex flex-col bg-card">
                <CardHeader className="p-0">
                  <AspectRatio ratio={16 / 9} className="overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                  </AspectRatio>
                </CardHeader>
                <CardContent className="p-5 flex-1 flex flex-col space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-semibold uppercase tracking-wider">
                      Update
                    </span>
                  </div>
                  <h3 className="font-bold text-xl leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {item.summary}
                  </p>
                </CardContent>
                <CardFooter className="p-5 pt-0 mt-auto">
                  <Button
                    variant="link"
                    className="p-0 h-auto text-primary font-medium group/btn"
                  >
                    Baca Selengkapnya
                    <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious className="-left-12 h-10 w-10 border-none bg-background/80 backdrop-blur-sm shadow-md hover:bg-background" />
          <CarouselNext className="-right-12 h-10 w-10 border-none bg-background/80 backdrop-blur-sm shadow-md hover:bg-background" />
        </div>
      </Carousel>
    </div>
  );
};
