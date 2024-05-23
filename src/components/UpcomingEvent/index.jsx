import CarouselCmp from "../Carousel"
import Col1 from "./col1"

const cont = `w-full bg-[#0C0814] border-gray-500 border-[1.5px] px-8 py-5 rounded-2xl hover:bg-gradient-to-r hover:from-[#B10C61] hover:to-[#2C3BFA] cursor-none transition-all duration-1000`
const h1 = "text-[#CCCCCC] text-4xl font-bold"
const h3 = "text-4xl text-[#CCCCCD] font-thin"

const UpcomingEvent = () => (
  <section className='w-[98.75vw] flex justify-center pt-44'>
    <div className='sm:w-[80vw] w-[90vw] xl:w-[1500px]'>

      <div className='cont flex gap-3 items-center'>
        <div className='w-12 h-[2px] bg-[#2C3BFA] transition-all duration-500 wid'></div>
        <h2 className='text-3xl font-bold text-white'>Ticket</h2>
      </div>

      <h1 className='text-white text-6xl font-bold mt-6'>Harmonia <br /> <span className='bord text-transparent'>Admissions</span></h1>

      <div className='flex justify-between w-full mt-5'>

        <div className='flex-[0.39]'><Col1 /></div>

        <div className='flex-[0.39!important] w-[35%]'><CarouselCmp /></div>

        <div className='flex-[0.17] flex flex-col justify-between'>

          <div className={cont}>
            <h1 className={h1}>20+</h1>
            <h3 className={h3}>Brands</h3>
          </div>

          <div className={cont}>
            <h1 className={h1}>100+</h1>
            <h3 className={h3}>Artworks</h3>
          </div>

        </div>

      </div>

    </div>

  </section>
)

export default UpcomingEvent