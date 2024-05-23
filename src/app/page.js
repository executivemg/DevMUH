import Banner from "@/components/banner/Banner";
import Cta from "@/components/banner/Cta";
import data from "../constant/data.json";
import ProductCard from "@/components/events/ProductCard";
import ViewMorebtn from "@/components/ui/buttons/viewMorebtn";
export default function Home() {
  return (
    <>
      <Banner video={data.videos.video1} />
      <Cta imageSrc={data.images[0].src} />
      <ProductCard />
      <ViewMorebtn />
      <Cta imageSrc={'/image/cta_5.png'} />
      <ProductCard />
      <ProductCard />
      <ViewMorebtn />
      <Banner video={data.videos.video2} />
      <Cta imageSrc={'/image/cta_3.png'} />
      <ProductCard />
      <ViewMorebtn />
      <Cta imageSrc={'/image/cta_4.png'} />
      <ProductCard />
      <ViewMorebtn />
      <Banner video={data.videos.video3} />
      <Cta imageSrc={'/image/cta_1.png'} />
      <ProductCard />
      <ViewMorebtn />
      <Banner video={data.videos.video4} />

    </>
  );
}

