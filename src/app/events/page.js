"use client";

import MobileFilter from "@/components/events/filter/MobileFilter";
import Productsfilter from "@/components/events/filter/ProductsFilter";
import ProductsSort from "@/components/events/filter/ProductsSort";
import ProductsList from "@/components/events/ProductsList";
import Banner from "@/components/banner/Banner";
import data from "../../constant/data.json";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function page() {
	return (
		<div className="bg-white  ">
			<div>
				{/* Mobile filter dialog */}
				<MobileFilter />
				<main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="w-full h-38">
						<Banner video={data.videos.video1} />
					</div>
					<div className="flex items-baseline justify-end border-b border-gray-200 pb-6 pt-24">
						<ProductsSort />
					</div>
					<section aria-labelledby="products-heading" className="pb-24 pt-6">
						<h2 id="products-heading" className="sr-only">
							Products
						</h2>
						<div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
							<Productsfilter />
							<div className="lg:col-span-4">
								<ProductsList />
							</div>
						</div>
					</section>
				</main>
			</div>
		</div>
	);
}
