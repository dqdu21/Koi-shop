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
                    - 99% of Koi keepers want their Koi fish to be "married off" to a good family that ensures their future and well-being. 
                    Some owners, fueled by passion, lack connections to exchange or sell their beautiful Koi.
                    <br />
                    - That’s why FKoi Shop offers this feature to help meet this desire. This service ensures that Koi are sold at fair value 
                    to true enthusiasts and guarantees a bright future for the fish.
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
                        - Suitable for those raising Koi for business, with an existing website and management system.
                      </p>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        - Consign fish to large Koi farms to expand customer network.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold text-red-700 mb-2">Offline Consignment</h3>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        - Suitable for Koi keepers without a website or professional Koi data management software.
                      </p>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        - Passionate about Koi, active in Koi forums but lacking a space or undergoing repairs.
                      </p>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        - Consign Koi for purposes such as upgrading or changing personal plans.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
                  <h2 id="section3" className="text-2xl font-bold text-red-800 mb-4">
                    Consignment Policy
                  </h2>
                  <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed space-y-2">
                    <li>Provide photos and detailed videos of the Koi fish.</li>
                    <li>Supply information: Name, age, gender, origin, species, personality, daily feeding volume, past diseases (if any), and certificate.</li>
                    <li>FKoi Shop may inspect the Koi fish directly (if necessary).</li>
                    <li>Negotiate a contract based on client’s price and requirements.</li>
                    <li>Sign the contract and ensure fish remain healthy until sold.</li>
                    <li>FKoi Shop assists clients with fish viewing and transaction closing.</li>
                    <li>When sold, the contract ends and the consignor is responsible for the fish quality post-sale.</li>
                  </ul>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
                  <h2 id="section4" className="text-2xl font-bold text-red-800 mb-4">Significance of Koi Fish Consignment</h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    <b className="text-red-800 mb-4">Popular in Japan: </b>
                    This is a very popular service in Japan. Customers may purchase a Koi fish but, for various reasons, are unable to take them home yet. 
                    More commonly, those with Koi for sale, but a limited network, consign them to larger Koi farms. Consignment fees are usually significant 
                    and include various binding and compensation terms.
                  </p>

                  <div className="my-8"></div>

                  <p className="text-lg text-gray-700 leading-relaxed">
                    <b className="text-red-800 mb-4">Gaining Popularity in Vietnam: </b>
                    Koi enthusiasts looking to upgrade or expand their pond or Koi stock, but lacking buyer connections, turn to consignment services at large 
                    Koi farms, known and respected within the Koi community.
                  </p>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
                  <h2 id="section5" className="text-2xl font-bold text-red-800 mb-4">FKoi Shop Commitment</h2>
                  <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed space-y-2">
                    <li>100% F0 and F1 Koi from renowned farms like Daihichi Koi Farm.</li>
                    <li>Carefully selected Koi with a selection rate of 300 out of 10,000 fish.</li>
                    <li>Comprehensive care knowledge and pond design guidance provided before Koi sales.</li>
                    <li>Koi are only sold if the client’s pond meets standards.</li>
                    <li>Detailed origin photos and videos for each fish.</li>
                    <li>Compensation up to 10 times the fish’s value if issues arise.</li>
                  </ul>
                </div>

                <div className="text-center mt-8">
                  <h2 className="text-2xl font-bold text-red-800 mb-4">Start Consigning Your Koi Fish Today!</h2>
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
