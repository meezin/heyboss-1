export default function Slide({ slide }) {
    return (
        <div className="flex flex-col md:flex-row">
            {/* Right Column for Image */}
            <div className="md:w-1/2 md:order-2">
                <div className="bg-cover bg-no-repeat bg-center h-48 w-full md:h-full"
                     style={{ backgroundImage: `url('${slide.img_url}')` }}
                     aria-label={slide.name}>
                    {/* Empty div for background image; Adjust size as needed */}
                </div>
            </div>
            {/* Left Column for Text */}
            <div className="md:w-1/2 md:order-1 p-6">
                <div className="space-y-4">
                    {/* Navigation/Links */}
                    <div className="flex space-x-4 font-semibold">
                        <a href="/maguy-le-coze" className="hover:text-gray-600">MAGUY LE COZE</a>
                        <a href="/eric-ripert" className="hover:text-gray-600">ERIC RIPERT</a>
                        <a href="/team" className="hover:text-gray-600">TEAM</a>
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
