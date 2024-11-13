import React, { ReactNode } from "react";
import koiBanner from "../assets/Images/KoiFishOverview.png";
import teamMember1 from "../assets/Images/team-member2.png";
import teamMember2 from "../assets/Images/team-member2.png";
import teamMember3 from "../assets/Images/team-member2.png";
import teamMember4 from "../assets/Images/team-member2.png";
import avatar1 from "../assets/Images/feedback1.png";
import avatar2 from "../assets/Images/feedback1.png";
import qualityIcon from "../assets/icons/quality.jpg";
import customerSatisfactionIcon from "../assets/icons/customer-satisfaction.png";
import sustainabilityIcon from "../assets/icons/sustainability.png";
import ethicsIcon from "../assets/icons/ethics.png";
import MainLayout from "../components/layout/MainLayout";

// Define types for component props
interface SectionTitleProps {
  children: ReactNode;
}

interface AboutSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

interface ValueItemProps {
  title: string;
  description: string;
  icon: string;
}

interface TeamMemberProps {
  name: string;
  role: string;
  imageUrl: string;
}

interface TestimonialProps {
  quote: string;
  author: string;
  avatar: string;
}

// Define components with types
const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => (
  <h2 className="text-2xl font-semibold text-red-800 mb-6">{children}</h2>
);

const AboutSection: React.FC<AboutSectionProps> = ({ title, children, className = "" }) => (
  <section className={`bg-gray-100 p-8 rounded-lg shadow-lg mb-10 ${className}`}>
    <SectionTitle>{title}</SectionTitle>
    {children}
  </section>
);

const ValueItem: React.FC<ValueItemProps> = ({ title, description, icon }) => (
  <div className="flex items-center space-x-4 mb-4">
    <img src={icon} alt={`${title} icon`} className="w-10 h-10" />
    <div>
      <p className="text-lg font-bold text-red-800">{title}:</p>
      <p className="text-gray-700">{description}</p>
    </div>
  </div>
);

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, imageUrl }) => (
  <div className="flex flex-col items-center text-center mb-8 w-full sm:w-1/2 md:w-1/4">
    <img src={imageUrl} alt={name} className="w-24 h-24 rounded-full mb-4" />
    <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
    <p className="text-gray-600 italic">{role}</p>
  </div>
);

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, avatar }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg text-center mb-6">
    <img src={avatar} alt={`${author}'s avatar`} className="w-16 h-16 rounded-full mx-auto mb-4" />
    <p className="italic text-gray-700">"{quote}"</p>
    <h4 className="font-semibold text-red-800 mt-4">- {author}</h4>
  </div>
);

const About: React.FC = () => {
  const values: ValueItemProps[] = [
    {
      title: "Commitment to Quality",
      description:
        "We carefully select each Koi fish to ensure our customers receive only the best quality fish.",
      icon: qualityIcon,
    },
    {
      title: "Customer Satisfaction",
      description:
        "Our team is dedicated to providing exceptional customer service and ensuring a smooth experience.",
      icon: customerSatisfactionIcon,
    },
    {
      title: "Sustainability",
      description:
        "We focus on eco-friendly and sustainable practices in pond nurturing and management.",
      icon: sustainabilityIcon,
    },
    {
      title: "Ethical Farming Practices",
      description:
        "Our Koi fish are carefully nurtured to ensure ethical practices from start to finish.",
      icon: ethicsIcon,
    },
  ];

  const testimonials: TestimonialProps[] = [
    {
      quote: "Koi Farm Shop offers the best Koi fish and accessories on the market. My pond has never looked better!",
      author: "Customer 1",
      avatar: avatar1,
    },
    {
      quote: "Their customer care service is amazing! They helped me set up my pond and gave very useful advice.",
      author: "Customer 2",
      avatar: avatar2,
    },
  ];

  return (
    <MainLayout>
      <div className="text-center bg-red-100 py-10">
        <h1 className="text-4xl font-bold text-red-700 mb-4">About Us</h1>
        <p className="text-xl text-gray-700">
          Welcome to Koi Farm Shop - Your trusted partner in quality Koi fish and pond solutions.
        </p>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <AboutSection title="Welcome to Koi Farm Shop">
          <p className="text-gray-700 leading-relaxed mb-6">
            Welcome to Koi Farm Shop, the ideal destination for Koi fish enthusiasts. 
            We proudly bring you the highest quality Koi fish, with a focus on quality,
            sustainability, and customer satisfaction. Our farm has nurtured and cared for Koi fish for over a decade,
            committed to providing the best experience for our customers.
          </p>
          <img src={koiBanner} alt="Koi Farm Overview" className="w-full rounded-lg shadow-lg" />
        </AboutSection>

        <AboutSection title="Our Mission">
          <p className="text-gray-700 leading-relaxed">
            At Koi Farm Shop, we are committed to providing the highest quality Koi fish and comprehensive care solutions. 
            With over a decade of experience, we ensure each Koi is raised using ethical methods, helping them thrive in health and vibrance.
            Our mission is not only to offer customers beautiful fish but to create a community of Koi enthusiasts,
            where you can receive full support from our team of experts. We are ready to accompany you in the journey of creating and maintaining a perfect pond, 
            one that is not only beautiful but sustainable.
          </p>
        </AboutSection>

        <AboutSection title="Our Core Values">
          <div>
            {values.map((value, index) => (
              <ValueItem key={index} title={value.title} description={value.description} icon={value.icon} />
            ))}
          </div>
        </AboutSection>

        <AboutSection title="Meet Our Team">
          <p className="text-gray-700 leading-relaxed mb-6">
            Our team is made up of experienced Koi enthusiasts, pond experts, and customer care specialists. 
            Together, we work to ensure your experience at Koi Farm Shop is unmatched. 
            From pond design consultation to Koi health assessment, we’re here to support you!
          </p>
          <div className="flex flex-wrap justify-center">
            <TeamMember name="Phạm Việt Hàn" role="Koi Specialist" imageUrl={teamMember1} />
            <TeamMember name="Đinh Quang Dự" role="Pond Expert" imageUrl={teamMember2} />
            <TeamMember name="Ngô Viết Thanh Điền" role="Customer Service Manager" imageUrl={teamMember3} />
            <TeamMember name="Nguyễn Ngọc Trường Giang" role="Product Manager" imageUrl={teamMember4} />
          </div>
        </AboutSection>

        <AboutSection title="Customer Testimonials">
          <div>
            {testimonials.map((testimonial, index) => (
              <Testimonial key={index} {...testimonial} />
            ))}
          </div>
        </AboutSection>

        <AboutSection title="Sustainable Development">
          <p className="text-gray-700 leading-relaxed">
            We believe that responsible pond management is a key factor in environmental protection.
            Koi Farm Shop adopts eco-friendly systems and sustainable practices to minimize impact on nature,
            ensuring that our farm and Koi can thrive across generations.
          </p>
        </AboutSection>

        <section className="bg-red-700 text-white p-10 rounded-lg text-center mt-10">
          <h2 className="text-2xl font-bold mb-4">Are you ready to explore our Koi collection?</h2>
          <button className="bg-white text-red-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100">
            Discover Now
          </button>
        </section>
      </div>
    </MainLayout>
  );
};

export default About;
