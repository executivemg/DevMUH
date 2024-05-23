"use client"
import React from 'react'
import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'



const subCategories = [


    { name: 'Totes', href: '#' },
    { name: 'Backpacks', href: '#' },
    { name: 'Travel Bags', href: '#' },
    { name: 'Hip Bags', href: '#' },
    { name: 'Laptop Sleeves', href: '#' },
]
const filters = [


    {
        id: 'color',
        name: 'Color',
        options: [
            { value: 'white', label: 'White', checked: false },
            { value: 'beige', label: 'Beige', checked: false },
            { value: 'blue', label: 'Blue', checked: true },
            { value: 'brown', label: 'Brown', checked: false },
            { value: 'green', label: 'Green', checked: false },
            { value: 'purple', label: 'Purple', checked: false },
        ],
    },
    {
        id: 'category',
        name: 'Category',
        options: [
            { value: 'new-arrivals', label: 'New Arrivals', checked: false },
            { value: 'sale', label: 'Sale', checked: false },
            { value: 'travel', label: 'Travel', checked: true },
            { value: 'organization', label: 'Organization', checked: false },
            { value: 'accessories', label: 'Accessories', checked: false },
        ],
    },
    {
        id: 'size',
        name: 'Size',
        options: [
            { value: '2l', label: '2L', checked: false },
            { value: '6l', label: '6L', checked: false },
            { value: '12l', label: '12L', checked: false },
            { value: '18l', label: '18L', checked: false },
            { value: '20l', label: '20L', checked: false },
            { value: '40l', label: '40L', checked: true },
        ],
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const Productsfilter = () => {


    return (
        // <div className=" col-span-1 max-sm:hidden ">
        //     {/* AVAILABILITY */}
        //     <div>
        //         <div className="mt-2 mb-2 font-bold ">AVAILABILITY</div>
        //         <hr className="mb-2 bg-black h-[2px]" />
        //         <div>
        //             <input type="checkbox" className="w-4 h-4 mr-4 text-gray-400" />
        //             <label className=" text-gray-600 ">In Stock(32)</label>
        //         </div>
        //         <div>
        //             <input type="checkbox" className="w-4 h-4 mr-4 text-gray-400" />
        //             <label className=" text-gray-600 ">out of Stock(22)</label>
        //         </div>
        //     </div>

        //     {/* price */}
        //     <div className="mt-4 mb-4">
        //         <div className="font-bold mb-2 ">PRICE</div>
        //         <hr className="mb-5 bg-black h-[1px]" />

        //         <div className="flex ">
        //             <div className=" relative">
        //                 <input
        //                     type="text"
        //                     className=" px-6 mr-2 focus:border-gray-400 w-20 border-2 border-gray-400 h-10"
        //                 />
        //                 <div className=" text-10 font-bold absolute left-2 top-2">
        //                     $
        //                 </div>
        //             </div>
        //             to
        //             <div className=" relative">
        //                 <input
        //                     type="text"
        //                     className=" ml-2 focus:border-gray-400 w-20 border-2 border-gray-400 h-10"
        //                 />
        //                 <div className=" text-10 font-bold absolute left-4 top-2">
        //                     $
        //                 </div>
        //             </div>
        //         </div>
        //         <button className="bg-black text-white p-3 w-48 mt-2  h-10 text-center hover:bg-blue-600 hover:translate-x-2  shadow-b-lg shadow-black hover:text-white   ">
        //             APPLY
        //         </button>
        //     </div>

        //     <div>
        //         <div className="font-bold mb-4">
        //             ALL TICKETS GUARANTEED AUTHENTIC
        //         </div>
        //         <hr className="mb-2 bg-black h-[2px]" />
        //         <div className=" text-[14px] text-gray-500">
        //             Purchase with confidence. All tickets are 100% guaranteed and
        //             will arrive within minutes of your purchase directly from your
        //             favorite organizer, club or promoter.
        //         </div>
        //     </div>
        // </div>
        <>
            <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                    {subCategories.map((category) => (
                        <li key={category.name}>
                            <a href={category.href}>{category.name}</a>
                        </li>
                    ))}
                </ul>

                {filters.map((section) => (
                    <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                        {({ open }) => (
                            <>
                                <h3 className="-my-3 flow-root">
                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                        <span className="font-medium text-gray-900">{section.name}</span>
                                        <span className="ml-6 flex items-center">
                                            {open ? (
                                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                            ) : (
                                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                            )}
                                        </span>
                                    </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel className="pt-6">
                                    <div className="space-y-4">
                                        {section.options.map((option, optionIdx) => (
                                            <div key={option.value} className="flex items-center">
                                                <input
                                                    id={`filter-${section.id}-${optionIdx}`}
                                                    name={`${section.id}[]`}
                                                    defaultValue={option.value}
                                                    type="checkbox"
                                                    defaultChecked={option.checked}
                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                                <label
                                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                                    className="ml-3 text-sm text-gray-600"
                                                >
                                                    {option.label}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                ))}
            </form>
        </>
    )
}

export default Productsfilter