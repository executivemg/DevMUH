import { NextResponse } from "next/server";

const events = [
    {
        interestedInCustomDomain: 'hiphop',
        img: "/products/hiphop.png",
        eventTitle: "PISCES -VS-- AIRIES CLUB CONTINENTAL",
        eventVenue: "USA",
        dateOfEvent: new Date(),
        description: "Join us for an epic showdown between Pisces and Aries. Dance, music, and vibrant performances await. Don't miss out on this unforgettable night!",
        prices: {
            general: 100,
            vip: 200,
            student: 50
        },
    },
    {
        interestedInCustomDomain: 'event2',
        img: "https://avatars.mds.yandex.net/i?id=e30a0645abc09101273d76790a7c184e20a35f43-9846104-images-thumbs&n=13",
        eventTitle: "Event 2 Title",
        eventVenue: "USA",
        dateOfEvent: new Date(),
        description: "Experience the thrill of live music and dynamic performances. A night filled with excitement and entertainment. Perfect for music lovers and party enthusiasts.",
        prices: {
            general: 100,
            vip: 200,
            student: 50
        },
    },
    {
        interestedInCustomDomain: 'event3',
        img: "https://avatars.mds.yandex.net/i?id=4a8ed5accb777d3b6caafcf9243a185e-5023807-images-thumbs&n=13",
        eventTitle: "Event 3 Title",
        eventVenue: "USA",
        dateOfEvent: new Date(),
        description: "An evening of captivating performances and engaging activities. Join us for a night of fun and unforgettable memories. Suitable for all ages.",
        prices: {
            general: 100,
            vip: 200,
            student: 50
        },
    },
    {
        interestedInCustomDomain: 'event4',
        img: "https://avatars.mds.yandex.net/i?id=9324f7f7cdeacec25dc3b43b00ced487b90b80e2-9217732-images-thumbs&n=13",
        eventTitle: "Event 4 Title",
        eventVenue: "USA",
        dateOfEvent: new Date(),
        description: "Get ready for an extraordinary event with top-notch performances and exciting activities. A perfect night out with friends and family. Fun for everyone!",
        prices: {
            general: 100,
            vip: 200,
            student: 50
        },
    },
    {
        interestedInCustomDomain: 'event5',
        img: "https://avatars.mds.yandex.net/i?id=4d0de560c6338b2bd272f294156de5f4-5859245-images-thumbs&n=13",
        eventTitle: "Event 5 Title",
        eventVenue: "USA",
        dateOfEvent: new Date(),
        description: "Join us for a night of spectacular performances and lively entertainment. Dance, music, and more await. Don't miss out on the fun and excitement!",
        prices: {
            general: 100,
            vip: 200,
            student: 50
        },
    },
    {
        interestedInCustomDomain: 'event6',
        img: "https://avatars.mds.yandex.net/i?id=4d0de560c6338b2bd272f294156de5f4-5859245-images-thumbs&n=13",
        eventTitle: "Event 6 Title",
        eventVenue: "USA",
        dateOfEvent: new Date(),
        description: "An evening filled with fantastic performances and engaging activities. Perfect for making new memories with friends and family. Join us for an unforgettable experience!",
        prices: {
            general: 100,
            vip: 200,
            student: 50
        },
    }
];

export async function GET(req) {
    try {
        const interestedInCustomDomain = req.nextUrl.searchParams.get("event");

        if (!interestedInCustomDomain) {

            return NextResponse.json({ success: true, data: events }, { status: 200 });

        };

        const filteredEvents = events.filter(event => event.interestedInCustomDomain === interestedInCustomDomain);

        if (filteredEvents?.length === 0) {
            return NextResponse.json({ error: "Event not found" }, { status: 404 });
        } else {

        }
        return NextResponse.json({ success: true, data: filteredEvents }, { status: 200 })

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}