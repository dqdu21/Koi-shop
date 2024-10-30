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
    { id: 'section1', title: 'Quy trình ký gửi' },
    { id: 'section2', title: 'Các phương thức ký gửi' },
    { id: 'section3', title: 'Chính sách ký gửi' },
    { id: 'section4', title: 'Ý nghĩa của việc ký gửi cá Koi' },
    { id: 'section5', title: 'FKoi Shop cam kết' }
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
                <h1 className="text-3xl font-bold text-center text-red-800 mb-6">Ký gửi cá Koi</h1>

                <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
                  <h2 id="section1" className="text-2xl font-bold text-red-800 mb-4">
                    Quy trình ký gửi
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    - 99% những người nuôi cá đều mong em koi của mình được “gả” vào gia đình tốt, đảm bảo cuộc sống, tương lai. 
                    Một số người chỉ nuôi Koi bằng đam mê không đủ quan hệ rộng để trao đổi, bán các em koi đẹp.
                    <br />
                    - Vì vậy FKoi Shop ra đời tính năng này nhằm giúp đáp ứng nguyện vọng đó. Dịch vụ này đảm bảo rằng cá Koi sẽ được bán đúng
                    giá trị cho những người thực sự đam mê và đảm bảo cuộc sống tương lai tốt đẹp cho cá.
                  </p>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
                  <h2 id="section2" className="text-2xl font-bold text-red-800 mb-4">
                    Các phương thức ký gửi
                  </h2>

                  <div className="space-y-4">
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold text-red-700 mb-2">Ký gửi Online</h3>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        - Phù hợp với những người nuôi Koi để kinh doanh, đã có hệ thống website và phần mềm quản lý.
                      </p>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        - Ký gửi cá tại các trang trại Koi lớn để mở rộng mạng lưới khách hàng.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold text-red-700 mb-2">Ký gửi Offline</h3>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        - Phù hợp với những người nuôi Koi chưa có website, chưa có phần mềm quản lý dữ liệu Koi chuyên nghiệp.
                      </p>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        - Đam mê nuôi Koi, tham gia các hội Koi trên diễn đàn xã hội nhưng thiếu địa điểm hoặc đang sửa chữa.
                      </p>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        - Ký gửi Koi để muốn nâng cấp Koi khác, thay đổi kế hoạch cá nhân.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
                  <h2 id="section3" className="text-2xl font-bold text-red-800 mb-4">
                    Chính sách ký gửi
                  </h2>
                  <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed space-y-2">
                    <li>Chụp ảnh và cung cấp video chi tiết về cá Koi.</li>
                    <li>Cung cấp thông tin: Tên, tuổi, giới tính, nguồn gốc, chủng loại, tính cách, lượng thức ăn hàng ngày, các bệnh đã từng mắc (nếu có), và giấy chứng nhận.</li>
                    <li>FKoi Shop có thể kiểm tra trực tiếp cá Koi (nếu thấy cần thiết).</li>
                    <li>Thương thảo hợp đồng dựa trên yêu cầu và mức giá do khách hàng đưa ra.</li>
                    <li>Ký hợp đồng và đảm bảo cá vẫn khỏe mạnh cho đến khi bán.</li>
                    <li>FKoi Shop hỗ trợ khách hàng mua xem cá và chốt giao dịch.</li>
                    <li>Khi cá được bán, hợp đồng kết thúc và người ký gửi chịu trách nhiệm về chất lượng cá sau khi bán.</li>
                  </ul>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
                  <h2 id="section4" className="text-2xl font-bold text-red-800 mb-4">Ý nghĩa của việc ký gửi cá Koi</h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    <b className="text-red-800 mb-4">Phổ biến tại Nhật Bản: </b>
                    Đây là dịch vụ rất phổ biến tại Nhật Bản. 
                    Khách mua Koi 1 em koi nhưng vì 1 lý do nào đó chưa thể đưa em ấy về nuôi, 
                    khách ký gửi tại hồ nuôi. Phổ biến hơn là khách có Koi cần bán, 
                    nhưng mạng lưới bán hàng không lớn, người nuôi Koi đưa Koi đến hồ nuôi,
                    Koi farm lớn hơn ký gửi. Tại Nhật chi phí ký gửi Koi thường khá lớn. 
                    Bao gồm nhiều các điều khoản ràng buộc, bồi thường.
                  </p>

                  <div className="my-8"></div>

                  <p className="text-lg text-gray-700 leading-relaxed">
                    <b className="text-red-800 mb-4">Bắt đầu nở rộ tại Việt Nam: </b>
                    Người chơi Koi muốn nâng cấp Koi, mở rộng hồ Koi, đàn Koi… 
                    nhưng không đủ năng lực tìm người muốn mua koi của mình. 
                    Vì vậy, họ tìm đến các dịch vụ kí gửi tại các Koi Farm lớn,
                    có hồ nuôi chuyên nghiệp, được đông đảo người chơi Koi biết đến.
                  </p>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
                  <h2 id="section5" className="text-2xl font-bold text-red-800 mb-4">FKoi shop cam kết</h2>
                  <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed space-y-2">
                    <li>100% Koi F0 và F1 từ những trại nổi tiếng như Daihichi Koi Farm.</li>
                    <li>Cá Koi đã được chọn lọc kỹ càng với tỷ lệ 300/10.000 con.</li>
                    <li>Cung cấp đầy đủ kiến thức chăm sóc và thiết kế hồ cá trước khi bán Koi.</li>
                    <li>Chỉ bán Koi khi hồ nuôi của khách hàng đạt chuẩn.</li>
                    <li>Cam kết cung cấp hình ảnh và video chi tiết về nguồn gốc từng chú cá.</li>
                    <li>Bồi thường gấp 10 lần giá trị cá nếu có vấn đề xảy ra.</li>
                  </ul>
                </div>

                <div className="text-center mt-8">
                  <h2 className="text-2xl font-bold text-red-800 mb-4">Bắt đầu ký gửi cá Koi của bạn ngay hôm nay!</h2>
                  <button
                    className="px-6 py-2 bg-red-800 text-white rounded-lg hover:bg-red-700 transition-colors text-lg"
                    onClick={handleConsignmentClick}
                  >
                    Ký gửi ngay
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
