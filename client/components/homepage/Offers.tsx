import Image from 'next/image'
import Link from 'next/link'
import { Autoplay } from 'swiper'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
import getFlagEmoji from '../../utils/getFLagEMoji'
import Button from '../core/Button'

const Offers = () => {
    const offers = [
        {
            title: 'Save 15% with Late Escape Deals',
            description: 'Check one more destination off your wishlist',
            button: 'Explore',
            image: 'la.jpeg'
        },
        {
            title: 'Escape for a while',
            description: 'Enjoy the freedom of a monthly stay on Booking',
            button: 'Discover',
            image: 'pash.jpeg'
        },
        {
            title: 'Easy trip planner',
            description: 'Pick a vibe and explore the top destinations',
            button: 'Discover',
            image: 'R.jpeg'
        }
    ]

    const locations = [
        {
            name: 'Pokhara',
            city: 'Pokhara',
            countryCode: 'NP',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQecMgY1VylcZT5W8Yo7zCyTDAHJAHbKOA3jA&s'
        },
        {
            name: 'Sagarmatha',
            city: 'Sagarmatha',
            countryCode: 'NP',
            image: 'https://images.travelandleisureasia.com/wp-content/uploads/sites/3/2023/12/29122005/yak.jpeg?tr=w-1920'
        },
        {
            name: 'Chitwan',
            city: 'Chitwan',
            countryCode: 'NP',
            image: 'https://images.travelandleisureasia.com/wp-content/uploads/sites/3/2023/12/29122017/chitwan.jpeg?tr=w-1920'
        },
        {
            name: 'Mustang',
            city: 'Mustan',
            countryCode: 'NP',
            image: 'https://images.travelandleisureasia.com/wp-content/uploads/sites/3/2023/12/29122032/mustang.jpeg?tr=w-1920'
        },
        {
            name: 'Tilicho',
            city: 'Tilicho',
            countryCode: 'NP',
            image: 'https://images.travelandleisureasia.com/wp-content/uploads/sites/3/2023/12/29122040/lake.jpeg?tr=w-1920'
        },
        {
            name: 'Lumbini',
            city: 'Lumbini',
            countryCode: 'NP',
            image: 'https://images.travelandleisureasia.com/wp-content/uploads/sites/3/2023/12/29122054/lumbini.jpeg?tr=w-1920'
        }
    ]
    return (
        <div className="mt-48 sm:mt-32 lg:mt-28 mb-20 w-full relative">
            <div className="mb-5">
                <h1 className="font-bold text-2xl text-black">Offers</h1>
                <h2 className="text-primary font-light text-xl">Promotions, deals, and special offers for you</h2>
            </div>

            <div className="select-none mb-5">
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1.5}
                    loop={true}
                    autoplay={true}
                    modules={[Autoplay]}
                >
                    {offers.map(offer =>
                        <SwiperSlide key={offer.title}>
                            <div className="relative w-full rounded-2xl overflow-hidden">
                                <Image className="absolute w-full h-full -z-10 object-cover"
                                    src={`/assets/images/offer/${offer.image}`}
                                    alt={offer.title}
                                    width={1000}
                                    height={300}
                                    loading={'lazy'}
                                />
                                <div className="p-2.5 sm:px-5 sm:py-10 text-white">
                                    <h2 className="font-bold mb-2 text-2xl sm:text-3xl h-24 sm:h-16 lg:h-max">{offer.title}</h2>
                                    <h2 className="mb-5">{offer.description}</h2>
                                    <Button text={offer.button} textColor={'text-white'}
                                        bgColor={'bg-lightPrimary'}/>
                                </div>
                            </div>
                        </SwiperSlide>
                    )}

                </Swiper>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Fix key index */}
                {locations.map((location, index) =>
                    <Link href={`/search/${location.city}`} key={index}>
                        <div
                            className={`relative block overflow-hidden rounded-xl `}
                        >
                            <Image className="absolute w-full h-full object-cover" src={location.image}
                                alt={location.name}
                                width={200}
                                height={100}/>
                            <div className="relative p-8 pt-40 text-white hover:bg-black hover:bg-opacity-40">
                                <h3 className="text-2xl font-bold">{location.name}</h3>
                                <p className="text-xl">{getFlagEmoji(location.countryCode)}</p>
                            </div>
                        </div>
                    </Link>
                )}
            </div>

        </div>
    )
}

export default Offers
