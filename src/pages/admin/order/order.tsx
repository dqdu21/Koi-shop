// import { Layout, Typography } from "antd";
// import AdminHeader from "../header/AdminHeader";
// import AdminSidebar from "../siderbar/AdminSiderbar"; 
// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { GetOrders } from "@/services/orderService"; 

// const { Content } = Layout;

// interface Order {
//   id: string;
//   contactName: string;
//   contactNumber: string;
//   totalWeight: number;
//   totalPrice: number;
//   shippingFee: number;
//   paymentMethod: string;
//   status: string;
//   estimatedDeliveryDate: string;
//   orderItems: Array<{
//     id: string;
//     quantity: number;
//     price: number;
//     product: {
//       name: string;
//       description: string;
//     };
//   }>;
// }

// export default function Orders() {
//   const [orders, setOrders] = useState<Order[]>([]);

//   const fetchOrders = async () => {
//     const res = await GetOrders(); // Replace with actual fetch call
//     setOrders(res.result.data);
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   return (
//     <Layout className="h-screen">
//       <AdminSidebar />
//       <Layout>
//         <AdminHeader />
//         <Content className="p-5 bg-gray-100 overflow-auto">
//           <div className="bg-white p-5 rounded-lg shadow-md text-center">
//             <Typography.Title level={2}>Order List</Typography.Title>
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-slate-500 text-white">
//                   <TableHead>Contact Name</TableHead>
//                   <TableHead>Contact Number</TableHead>
//                   <TableHead>Total Weight</TableHead>
//                   <TableHead>Total Price</TableHead>
//                   <TableHead>Shipping Fee</TableHead>
//                   <TableHead>Payment Method</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Estimated Delivery</TableHead>
//                   <TableHead>Order Items</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {orders.map((order) => (
//                   <TableRow key={order.id}>
//                     <TableCell>{order.contactName}</TableCell>
//                     <TableCell>{order.contactNumber}</TableCell>
//                     <TableCell>{order.totalWeight} kg</TableCell>
//                     <TableCell>{order.totalPrice} VND</TableCell>
//                     <TableCell>{order.shippingFee} VND</TableCell>
//                     <TableCell>{order.paymentMethod}</TableCell>
//                     <TableCell>{order.status}</TableCell>
//                     <TableCell>{order.estimatedDeliveryDate}</TableCell>
//                     <TableCell>
//                       {order.orderItems.map((item) => (
//                         <div key={item.id} className="mb-2">
//                           <strong>{item.product.name}</strong> - {item.quantity} pcs at {item.price} VND each
//                         </div>
//                       ))}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         </Content>
//       </Layout>
//     </Layout>
//   );
// }
