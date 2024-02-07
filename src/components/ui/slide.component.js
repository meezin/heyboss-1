export default function Slide({ slide}) {

    // Define a click handler for your links
    // const handleLinkClick = (slideName,e) => {
    //     e.preventDefault();
    //     navigateToSlide(slideName);
    //     };

    return (
        <div className="w-full pl-34 pr-4 pt-8 pb-14 md:pl-32 md:pr-20 pt-[150px]">
            {/* Right Column for Image */}
            <div className="md:w-1/2 md:order-2">
                <div className="bg-cover bg-no-repeat bg-center h-48 w-full md:h-full"
                     style={{ backgroundImage: `url('${slide.img_url}')` }}
                     aria-label={slide.name}>
                    {/* Empty div for background image; Adjust size as needed */}
                </div>
            </div>
            {/* Left Column for Text */}
            <div className="md:w-1/2 md:order-1 p-8">
                <div className="space-y-4">
                    {/* Navigation/Links */}
                    <div className="flex space-x-4 font-semibold">
                        <button className="hover:text-gray-600">MAGUY LE COZE</button>
                        <button className="hover:text-gray-600">ERIC RIPERT</button>
                        <button className="hover:text-gray-600">TEAM</button>
                    </div>
                    {/* Quote */}
                    <blockquote className="italic">
                        {slide.quote}
                    </blockquote>
                    {/* Biography Text */}
                    <p className="text-sm">
                        {slide.bio}
                    </p>
                </div>
            </div>
        </div>
    );
}
