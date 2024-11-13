// import React, { useEffect, useState } from "react";
// import { Table, Button, Space, message, Tooltip } from "antd";
// import type { ColumnsType } from "antd/es/table";
// import { ConsignmentOffline } from "@/models/consignment";
// import { queryConsignmentsAdmin, evaluateConsignment } from ".../services"

// const AdminConsignmentList: React.FC = () => {
//   const [data, setData] = useState<ConsignmentOffline[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch consignment data for admin
//   useEffect(() => {
//     fetchConsignments();
//   }, []);

//   const fetchConsignments = async () => {
//     setLoading(true);
//     try {
//       const response = await queryConsignmentsAdmin({ searchCondition: {}, pageInfo: { pageNum: 1, pageSize: 10 } });
//       if (response?.isSuccess) {
//         setData(response.result.data);
//       } else {
//         message.error("Failed to fetch consignment list.");
//       }
//     } catch (error) {
//       message.error("An error occurred while fetching consignment list.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEvaluate = async (id: string, isApproved: boolean) => {
//     try {
//       const response = await evaluateConsignment(id, isApproved);
//       if (response?.isSuccess) {
//         message.success(isApproved ? "Consignment approved." : "Consignment rejected.");
//         fetchConsignments(); // Refresh the list after evaluation
//       } else {
//         message.error("Failed to update consignment status.");
//       }
//     } catch (error) {
//       message.error("An error occurred while updating consignment status.");
//     }
//   };

//   const columns: ColumnsType<ConsignmentOffline> = [
//     {
//       title: "Consignment ID",
//       dataIndex: "id",
//       key: "id",
//     },
//     {
//       title: "User ID",
//       dataIndex: "userId",
//       key: "userId",
//     },
//     {
//       title: "Product Name",
//       dataIndex: ["product", "name"],
//       key: "productName",
//     },
//     {
//       title: "Description",
//       dataIndex: ["product", "description"],
//       key: "description",
//       render: (text: string) => (
//         <Tooltip title={text}>
//           <div
//             style={{
//               maxWidth: "200px",
//               whiteSpace: "nowrap",
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//             }}
//           >
//             {text}
//           </div>
//         </Tooltip>
//       ),
//     },
//     {
//       title: "Dealing Amount",
//       dataIndex: "dealingAmount",
//       key: "dealingAmount",
//       render: (amount: number) => `${amount.toLocaleString()} VND`,
//     },
//     {
//       title: "Date Created",
//       dataIndex: "createdAt",
//       key: "createdAt",
//       render: (date: string) => new Date(date).toLocaleDateString(),
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (_, record) => (
//         <Space size="middle">
//           <Button type="primary" onClick={() => handleEvaluate(record.id, true)}>
//             Approve
//           </Button>
//           <Button type="danger" onClick={() => handleEvaluate(record.id, false)}>
//             Reject
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div className="p-8 bg-white rounded-lg shadow-lg" style={{ maxWidth: 1000, margin: "auto" }}>
//       <h2 className="text-3xl font-bold mb-4" style={{ color: "#8B0000", textAlign: "center" }}>
//         Admin Consignment List
//       </h2>

//       <Table<ConsignmentOffline>
//         columns={columns}
//         dataSource={data}
//         loading={loading}
//         rowKey="id"
//         pagination={{ pageSize: 10 }}
//       />
//     </div>
//   );
// };

// export default AdminConsignmentList;
