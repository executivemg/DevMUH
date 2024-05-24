import React from 'react';
import Marquee from 'react-fast-marquee';

const MarqueeImgs = () => {
  const baseUrl = 'https://themeperch.net/eventiva/demo-5/wp-content/themes/eventiva/assets/images/home-1/gallery-';
  const totalImages = 12;

  const images = Array.from({ length: totalImages }, (_, i) => `${baseUrl}${i + 1}.jpg`);

  const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  const shuffledImages1 = shuffleArray([...images]);
  const shuffledImages2 = shuffleArray([...images]);

  return (
    <div className="pt-24">
      <Marquee pauseOnHover speed={30}>
        {shuffledImages1.map((src, i) => (
          <img key={i} className='h-[250px] object-contain rounded-3xl mx-4' src={src} alt="" />
        ))}
      </Marquee>
      <Marquee pauseOnHover speed={30} className='mt-8'>
        {shuffledImages2.map((src, i) => (
          <img key={i} className='h-[250px] object-contain rounded-3xl mx-4' src={src} alt="" />
        ))}
      </Marquee>
    </div>
  );
}

export default MarqueeImgs;
