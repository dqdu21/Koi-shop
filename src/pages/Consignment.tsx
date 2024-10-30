import React, { useState } from 'react';
import { Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import AppHeader from '../components/layout/AppHeader';
import AppFooter from '../components/layout/AppFooter';
import AppSider from '../components/layout/AppSider';
import { useSider } from '../app/context/SiderProvider';
import { useNavigate } from 'react-router-dom';
import ModalContents from '../components/modal/ModalContents';

const Consignment: React.FC = () => {
  const navigate = useNavigate();
  const { collapsed } = useSider();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const headings = [
    { id: 'section1', title: 'Consignment Process' },
    { id: 'section2', title: 'Consignment Methods' },
    { id: 'section3', title: 'Consignment Policy' },
    { id: 'section4', title: 'Significance of Koi Fish Consignment' },
    { id: 'section5', title: 'FKoi Shop Commitment' }
  ];

  const handleConsignmentClick = () => {
    navigate('/consignment-form');
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex">
      <Layout className="min-h-screen flex flex-col">
        {/* Header */}
        <Header className="header fixed top-0 left-0 right-0 z-50">
          <AppHeader />
        </Header>

        {/* Layout with Sider and Content */}
        <Layout className="flex flex-1" style={{ paddingTop: '64px' }}>
          {/* Sider (Sidebar) */}
          <Sider
            className="sider fixed left-0 top-16 bottom-0 z-40"
            collapsed={collapsed}
            collapsedWidth={0}
            trigger={null}
            width={220}
          >
            <AppSider className={`transition-all duration-75 ${collapsed ? "w-0" : "w-64"}`} />
          </Sider>

          {/* Main Content */}
          <Layout
            className="flex flex-col flex-1"
            style={{ paddingLeft: collapsed ? '0px' : '220px' }}
          >
            <Content className="flex-grow overflow-auto p-8 bg-gray-50">
              {/* Main Content for Consignment Page */}
              <div className="container mx-auto py-8 px-4 lg:px-16 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold text-center text-red-800 mb-6">Koi Fish Consignment</h1>

                <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
                  <h2 id="section1" className="text-2xl font-bold text-red-800 mb-4">
                    Consignment Process
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    - 99% of Koi fish owners want their fish to be “matched” with a good family to ensure a quality life and future.
                    Some people keep Koi out of passion but may not have the necessary connections to sell or exchange high-quality Koi.
                    <br />
                    - This is why FKoi Shop offers this service: to help fulfill these wishes. This service ensures that Koi fish are sold at fair value to genuine enthusiasts who can guarantee a good future for them.
                  </p>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
                  <h2 id="section2" className="text-2xl font-bold text-red-800 mb-4">
                    Consignment Methods
                  </h2>

                  <div className="space-y-4">
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold text-red-700 mb-2">Online Consignment</h3>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        - Suitable for those raising Koi for business purposes, with a website and management software already in place.
                      </p>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        - Consign your fish at large Koi farms to expand your customer network.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold text-red-700 mb-2">Offline Consignment</h3>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        - Suitable for those who don’t have a website or specialized Koi management software.
                      </p>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        - Koi enthusiasts who participate in social media groups but lack a physical space or are renovating.
                      </p>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        - Consigning Koi fish to upgrade to new fish or for personal changes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
                  <h2 id="section3" className="text-2xl font-bold text-red-800 mb-4">
                    Consignment Policy
                  </h2>
                  <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed space-y-2">
                    <li>Provide detailed photos and videos of the Koi fish.</li>
                    <li>Provide information: name, age, gender, origin, type, temperament, daily feeding amount, past illnesses (if any), and certification.</li>
                    <li>FKoi Shop may conduct a direct inspection of the Koi fish if necessary.</li>
                    <li>Negotiate a contract based on the customer’s requirements and price.</li>
                    <li>Sign a contract and ensure the fish remains healthy until sold.</li>
                    <li>FKoi Shop assists with customer viewings and finalizing transactions.</li>
                    <li>Once the fish is sold, the contract ends, and the consignor is responsible for its quality after sale.</li>
                  </ul>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
                  <h2 id="section4" className="text-2xl font-bold text-red-800 mb-4">Significance of Koi Fish Consignment</h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    <b className="text-red-800 mb-4">Common in Japan:</b>
                    This service is very common in Japan. Customers may buy a Koi but, for various reasons, aren’t able to bring it home immediately, so they leave it at a holding pond.
                    It’s also common for Koi keepers who need a larger network to sell their fish to consign their Koi at larger farms. In Japan, consignment costs can be high and include several binding terms and compensations.
                  </p>

                  <div className="my-8"></div>

                  <p className="text-lg text-gray-700 leading-relaxed">
                    <b className="text-red-800 mb-4">Emerging in Vietnam:</b>
                    Koi enthusiasts may wish to upgrade their fish or expand their ponds but lack the means to find buyers. Thus, they turn to consignment services at larger Koi farms
                    that have professional facilities and are well-known among the Koi community.
                  </p>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
                  <h2 id="section5" className="text-2xl font-bold text-red-800 mb-4">FKoi Shop Commitment</h2>
                  <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed space-y-2">
                    <li>100% F0 and F1 Koi from renowned farms like Daihichi Koi Farm.</li>
                    <li>Carefully selected Koi with a 300/10,000 selection ratio.</li>
                    <li>Provide full care and pond design knowledge before selling Koi.</li>
                    <li>Only sell Koi when the customer’s pond meets standards.</li>
                    <li>Commitment to detailed images and videos on the origin of each fish.</li>
                    <li>Compensation up to 10 times the fish’s value if an issue arises.</li>
                  </ul>
                </div>

                <div className="text-center mt-8">
                  <h2 className="text-2xl font-bold text-red-800 mb-4">Start consigning your Koi fish today!</h2>
                  <button
                    className="px-6 py-2 bg-red-800 text-white rounded-lg hover:bg-red-700 transition-colors text-lg"
                    onClick={handleConsignmentClick}
                  >
                    Consign Now
                  </button>
                </div>
              </div>
            </Content>

            {/* Footer */}
            <Footer className="footer mt-auto">
              <AppFooter />
            </Footer>
          </Layout>
        </Layout>

        {/* ModalContents Component */}
        <ModalContents headings={headings} isOpen={isModalOpen} onClose={toggleModal} />
      </Layout>
    </div>
  );
};

export default Consignment;
