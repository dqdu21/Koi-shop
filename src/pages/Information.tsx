const Information = () => {

return(

<div className="p-8">
            <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Origin Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-bold text-4xl text-gray-900 font-serif">Origin of Koi Fish</h2>
          <a href="#" className="text-amber-600 hover:text-amber-700 text-base font-medium transition-colors duration-300">
            Explore more →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              When it comes to koi fish or koi carp, people will immediately think of Japan. This fish is known as the national fish of the land of the rising sun. According to some scientific documents, koi fish appeared in the 1820s in Ojiya town, Niigata province, Japan.
            </p>
          </div>
          <div className="relative h-[300px] overflow-hidden rounded-xl shadow-lg">
            <img 
              src="https://sanvuonadong.vn/wp-content/uploads/2020/07/ca-koi-nhat-ban-01-san-vuon-a-dong-768x491.jpg" 
              alt="Origin of Koi Fish" 
              className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Characteristics Section */}
      <section className="mb-16 bg-gray-50 p-8 rounded-2xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-bold text-4xl text-gray-900 font-serif">Characteristics</h2>
          <a href="#" className="text-amber-600 hover:text-amber-700 text-base font-medium transition-colors duration-300">
            Learn more →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              Basically, koi fish are closely related to goldfish. Currently, koi fish have been bred with hundreds of different species. However, there are about 24 recorded breeds, each with different identification characteristics and colors.
            </p>
            <ul className="space-y-2">
              {[
                "Average lifespan is 25 – 35 years. In favorable environments, koi fish can live up to several hundred years.",
                "Koi fish develop continuously, with growth rates of 50 – 150mm per year depending on the breed.",
                "Adult koi fish can reach a maximum length of 1 meter.",
                "Sex is distinguishable by body shape: males have long bodies, while females have plumper bodies, especially when pregnant.",
                "Female koi fish can lay from 150,000 to 200,000 eggs per litter, starting after about 1 year of raising."
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-[400px] overflow-hidden rounded-xl shadow-lg">
            <img 
              src="https://sanvuonadong.vn/wp-content/uploads/2020/07/ca-koi-dep-co-than-hinh-can-doi-04-san-vuon-a-dong.jpg" 
              alt="Koi Fish Characteristics" 
              className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Techniques Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-bold text-4xl text-gray-900 font-serif">Techniques</h2>
          <a href="#" className="text-amber-600 hover:text-amber-700 text-base font-medium transition-colors duration-300">
            View all →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 relative h-[350px] overflow-hidden rounded-xl shadow-lg">
            <img 
              src="https://sanvuonadong.vn/wp-content/uploads/2020/07/khong-nen-nuoi-ca-koi-voi-mat-do-qua-day-06-san-vuon-a-dong.jpg" 
              alt="Koi Fish Techniques" 
              className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="order-1 md:order-2">
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              Choosing koi breeds: A healthy koi breed will determine 50% of the survival rate and stable development later. You should buy fish from reputable establishments with clear species and origin certificates.
            </p>
            <h3 className="font-semibold text-xl mb-3 text-gray-800">The Japanese koi breed you choose should have:</h3>
            <ul className="space-y-2 mb-4">
              {[
                "A balanced, smooth, elongated body.",
                "A thick mouth, long and hard beard, and harmonious fins.",
                "Bright colors with clear separation between patterns.",
                "Straight, strong swimming with quick reactions."
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-700 leading-relaxed text-lg italic">
              Avoid buying koi with deformities, dull colors, or slow movement, as these indicate poor health or disease.
            </p>
          </div>
        </div>
      </section>
    </div>
    </div>
)
};
export default Information;