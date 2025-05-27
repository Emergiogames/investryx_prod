import React from "react";

function AboutUs() {
    
    const playUrl =
    'https://play.google.com/store/apps/details?id=com.investryx.projectemergio&hl=en';

    const chooseCard = [
        {
            img: "/investryx/eth-iso-color.png",
            title: "Currencies & commodities",
            desc: "Access a wide array of opportunities as you navigate the world of forex, cryptocurrencies, and commodities, each offering unique prospects for traders and investors.",
        },
        {
            img: "/investryx/sheild-iso-color.png",
            title: "Enterprise grade security",
            desc: "With our enterprise-grade security infrastructure, we prioritize the protection of your financial assets and sensitive information.",
        },
        {
            img: "/investryx/explorer-iso-color.png",
            title: "Real-time trading",
            desc: "Seamlessly navigate the dynamic world of financial markets as our advanced technology delivers live, up-to-the-second market data.",
        },
    ];

    const blogCard = [
        {
            img: "/investryx/image 10.png",
            desc: "Cross-Platform Compatibility: Web3 Wallet Now Supports Additional Blockchains",
            date: "Feb 2,2023",
        },
        {
            img: "/investryx/image 11.png",
            desc: "NFT Integration Revolutionizes Digital Collectibles with Web3 Wallet",
            date: "Jan 2,2023",
        },
        {
            img: "/investryx/image 12.png",
            desc: "Web3 Wallet Now Supports Polygon Network for Faster Transactions",
            date: "Dec 2,2023",
        },
    ];
    return (
        <>
            {/* AboutUs */}
            <div className="about-us px-3 sm:px-6 py-12 w-full">
                {/* About Content */}
                <h1 className="text-center text-3xl font-semibold md:text-5xl md:font-bold text-[#490057]">About Us</h1>
                <div className="about-content py-8 flex flex-col-reverse gap-8 md:flex-row justify-between text-center md:text-start md:max-w-[85%] mx-auto">
                    <p className="text-base sm:text-lg text-[#2A2A2A] px-4 sm:px-8 md:px-12">
                        INVESTRYX is fully committed to protecting your confidential information. If you as a visitor choose
                        to register or submit information to this website, you agree to the use of such data in accordance
                        with this privacy policy. Please note that this website may contain links to other sites which may
                        not be governed by this privacy policy. We collect and store confidential information including, but
                        not limited to your name, email address, telephone numbers, your company information, financial
                        information, transactional information based on your activities on the website, computer and
                        connection information, statistics on page views, traffic information, ad data, IP address, standard
                        web log information and supplemental information from third parties such as Google Analytics. If you
                        would like to opt-out of such implementations please stop using the website. Any confidential
                        document shared with INVESTRYX for professional services will only be used for the intended purpose
                        and will not be shared with any external party.
                    </p>
                    {/* About Image */}
                    <img className="w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto" src="\investryx\image.png" alt="" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-5 md:px-6">
                    <ul className="flex flex-col items-center gap-5">
                        <li className="text-xl font-light">Trusted By</li>
                        <li className="text-3xl md:text-4xl font-normal text-[#ffcc00]">15M+ Users</li>
                    </ul>
                    <ul className="flex flex-col items-center gap-5">
                        <li className="text-xl font-light">Globally</li>
                        <li className="text-3xl md:text-4xl font-normal text-[#ffcc00]">Audited</li>
                    </ul>
                    <ul className="flex flex-col items-center gap-5">
                        <li className="text-xl font-light">Top Reviews</li>
                        <li className="flex">
                            <img src="/svg/star.svg" alt="" />
                            <img src="/svg/star.svg" alt="" />
                            <img src="/svg/star.svg" alt="" />
                            <img src="/svg/star.svg" alt="" />
                            <img src="/svg/star.svg" alt="" />
                        </li>
                    </ul>
                    <ul className="flex flex-col items-center gap-5">
                        <li className="text-xl font-light">Founded In</li>
                        <li className="text-3xl md:text-4xl font-normal text-[#ffcc00]">2018</li>
                    </ul>
                </div>
            </div>
            {/* Choose Us  */}
            <div className="choose py-12">
                <h1 className="text-center text-3xl font-semibold md:text-5xl md:font-bold text-[#490057]">
                    Why Choose Us?
                </h1>
                <div className="choose-card flex flex-col gap-5 items-center py-9 md:flex-row md:justify-center w-full h-full mt-5 bg-[#fdfaef]">
                    {chooseCard.map((card, index) => (
                        <div
                            key={index}
                            className="card bg-white px-6 py-4 rounded-xl w-[80%] sm:w-75% md:w-[25%] h-full md:h-[330px] md:flex md:flex-col md:justify-center"
                        >
                            <img className="w-1/4" src={card.img} alt={card.title} />
                            <h1 className="text-2xl font-normal md:text-4xl">{card.title}</h1>
                            <p className="text-base font-light mt-4">{card.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
            {/* Testimonials */}
            {/* <div className="testimonials py-12 px-4 sm:px-8 lg:px-14 max-w-7xl mx-auto">
                <h1 className="text-center text-3xl font-semibold md:text-5xl md:font-bold text-[#490057] mb-10">
                    Our Testimonels
                </h1>
                <div className="testmonial-card grid grid-cols-1 gap-6 md:grid-cols-2 p-4 md:max-w-5xl md:mx-auto">
                    <div className="flex flex-col items-center gap-4 md:flex-row bg-white p-4 rounded-lg">
                        <img className="w-3/5 sm:w-1/2 md:w-1/4" src="\investryx\Rectangle 12.png" alt="" />
                        <div className="flex flex-col items-center gap-5 w-full sm:w-96 md:items-start md:w-72">
                            <h1 className="text-2xl font-semibold">Emily Smith</h1>
                            <p className="text-lg font-normal text-center md:text-left">
                            "Investryx offers a wide range of investment options. I've seen significant growth in my portfolio since I started using it."
                            </p>
                            <ul className="flex gap-2">
                                <li>
                                    <img src="\investryx\Vector.svg" alt="" />
                                </li>
                                <li>
                                    <img src="\investryx\Vector.svg" alt="" />
                                </li>
                                <li>
                                    <img src="\investryx\Vector.svg" alt="" />
                                </li>
                                <li>
                                    <img src="\investryx\Vector.svg" alt="" />
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-4 md:flex-row bg-white p-4 rounded-lg">
                        <img className="w-3/5 sm:w-1/2 md:w-1/4" src="\investryx\Rectangle 12.png" alt="" />
                        <div className="flex flex-col items-center gap-5 w-full sm:w-96 md:items-start md:w-72">
                            <h1 className="text-2xl font-semibold">Emily Smith</h1>
                            <p className="text-lg font-normal text-center md:text-left">
                            "The customer support team at Investryx is amazing. They guided me through every step of my investment journey."                          </p>
                            <ul className="flex gap-2">
                                <li>
                                    <img src="\investryx\Vector.svg" alt="" />
                                </li>
                                <li>
                                    <img src="\investryx\Vector.svg" alt="" />
                                </li>
                                <li>
                                    <img src="\investryx\Vector.svg" alt="" />
                                </li>
                                <li>
                                    <img src="\investryx\Vector.svg" alt="" />
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-4 md:flex-row bg-white p-4 rounded-lg">
                        <img className="w-3/5 sm:w-1/2 md:w-1/4" src="\investryx\Rectangle 12.png" alt="" />
                        <div className="flex flex-col items-center gap-5 w-full sm:w-96 md:items-start md:w-72">
                            <h1 className="text-2xl font-semibold">Emily Smith</h1>
                            <p className="text-lg font-normal text-center md:text-left">
                            " I love how Investryx simplifies complex investment strategies. It's perfect for both beginners and experienced investors."
                            </p>
                            <ul className="flex gap-2">
                                <li>
                                    <img src="\investryx\Vector.svg" alt="" />
                                </li>
                                <li>
                                    <img src="\investryx\Vector.svg" alt="" />
                                </li>
                                <li>
                                    <img src="\investryx\Vector.svg" alt="" />
                                </li>
                                <li>
                                    <img src="\investryx\Vector.svg" alt="" />
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-4 md:flex-row bg-white p-4 rounded-lg">
                        <img className="w-3/5 sm:w-1/2 md:w-1/4" src="\investryx\Rectangle 12.png" alt="" />
                        <div className="flex flex-col items-center gap-5 w-full sm:w-96 md:items-start md:w-72">
                            <h1 className="text-2xl font-semibold">Emily Smith</h1>
                            <p className="text-lg font-normal text-center md:text-left">
                            "Investryx has transformed the way I manage my investments. The platform is intuitive, and the insights are incredibly helpful!
                            </p>
                            <ul className="flex gap-2">
                                <li>
                                    <img src="\investryx\Vector.svg" alt="" />
                                </li>
                                <li>
                                    <img src="\investryx\Vector.svg" alt="" />
                                </li>
                                <li>
                                    <img src="\investryx\Vector.svg" alt="" />
                                </li>
                                <li>
                                    <img src="\investryx\Vector.svg" alt="" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* Blogs */}
            {/* <div className="blogs py-12">
                <h1 className="text-center text-3xl font-semibold md:text-5xl md:font-bold text-[#490057]">Our Blogs</h1>
                <div className="blog-card flex flex-col gap-5 px-4 items-center py-9 md:flex-row md:justify-center w-full h-full mt-5 bg-[#fdfaef]">
                    {blogCard.map((card, index) => (
                        <div
                            key={index}
                            className="card bg-white px-4 py-4 rounded-xl h-full flex flex-col gap-5 sm:w-3/4 md:w-1/5"
                        >
                            <img className="w-full" src={card.img} alt="" />
                            <p className="font-light text-sm">{card.desc}</p>
                            <ul className="flex justify-between items-center text-sm font-light">
                                <li>Article</li>
                                <li>{card.date}</li>
                            </ul>
                        </div>
                    ))}
                </div>
            </div> */}
            {/* Get Start */}
            <div className="get-start py-8 px-3">
                <div className="bg-[#FFCC00] rounded-xl py-3 px-4 mx-auto sm:px-8 lg:px-12 flex flex-col items-center justify-center gap-8 sm:flex-row sm:justify-between md:h-[400px] md:w-4/5">
                    <div className="text-center space-y-6 sm:text-left">
                        <h1 className="text-2xl sm:text-3xl md:text-5xl font-semibold">Get Started for Free</h1>
                        <p className="font-normal text-base md:text-2xl">
                            You can start for free with download the app or install the extension from your PC browser
                        </p>
                        <div className="flex flex-col items-center sm:flex-row sm:justify-between md:justify-start gap-4">
                            <button  onClick={() => (window.location.href = playUrl)} className="bg-white p-4 rounded-full text-sm font-semibold flex items-center sm:gap-2 sm:text-base sm:p-3 sm:font-semibold">
                                <img className="" src="\investryx\Mobile.svg" alt="" />
                                Download Mobile App
                            </button>
                        </div>
                    </div>
                    <img className="hidden sm:block sm:w-1/4  md:size-96" src="\investryx\Group 17.png" alt="" />
                </div>
            </div>
            {/* Newsletter */}
            {/* <div className="news-letter relative py-12 px-4 sm:px-6 lg:px-8 w-full my-8">
                <img className="w-1/6 md:w-1/12 -z-50 absolute top-8 md:left-44" src="\investryx\Vector 3.png" alt="" />
                <img
                    className="w-1/6 md:w-1/12 -z-50 absolute top-8 right-0 md:right-28 "
                    src="\investryx\Vector 4.png"
                    alt=""
                />
                <div className="max-w-7xl mx-auto w-full">
                    <h1 className="text-2xl sm:text-4xl lg:text-5xl text-[#494949] font-montserrat font-semibold text-center my-8 sm:my-10 leading-tight sm:leading-snug lg:leading-[62px] px-4 sm:px-8 lg:px-16 xl:px-72">
                        Subscribe To Get The Latest News About Us
                    </h1>
                    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-5">
                        <p className="font-vietnam text-base sm:text-xl lg:text-2xl text-center text-[#00000080]">
                            Stay updated with the latest investment trends, market insights, and exclusive offers from
                            Investryx. Subscribe now to never miss out!
                        </p>
                        <div className="relative w-full max-w-3xl mx-auto">
                            <input
                                type="text"
                                className="w-full h-12 text-white sm:h-14 md:h-[67px] rounded-full px-4 sm:px-6 md:px-20 text-sm sm:text-base md:text-2xl bg-[#494949] shadow-2xl font-vietnam"
                                placeholder="Enter your Email"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 py-2 px-4 sm:px-6 md:px-12 bg-[#FFCC00] text-sm sm:text-base md:text-2xl text-black font-montserrat rounded-full font-medium hover:bg-[#e6b800] transition-colors">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
}

export default AboutUs;
