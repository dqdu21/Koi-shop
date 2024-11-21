import { Layout, Typography } from "antd";
import AdminHeader from "../header/AdminHeader";
import AdminSidebar from "../siderbar/AdminSiderbar";
import { GetAllOrder, deleteOrder } from "@/services/orderService";
import { useEffect, useState } from "react";
import { Trash, Plus, Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addOrder, updateOrder } from "@/services/orderService";
import CredentialForm from "@/components/form/FormCredential";
import { Switch } from "@/components/ui/switch";
import { type Order } from "@/models/order";
import { updateOrderAccept, updateOrderCancel, updateOrderReturn } from "@/services/orderService";

const { Content } = Layout;
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"



export default function Order() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUpdate,setIsOpenUpdate] = useState(false)
  const [isOpenCredential, setIsOpenCredential] = useState(false)
  const [orders,setOrders] = useState<Order[]>([])
  const [orderSelected,setOrderSelected] = useState<any>()
  const fetchOrder = async () => {
    const res = await GetAllOrder();
    console.log('Check: ', res.result.data);
    setOrders(res.result.data);
  }
  useEffect(() => {
    fetchOrder()
  }, [])
  const handleAdd = async (data:any) => {
    await addOrder(data);
    setIsOpen(false)
    fetchOrder()
  }
  const handleUpdate = async (data: any) => {
    await updateOrder(orderSelected.id,data)
    setIsOpenUpdate(false);
    fetchOrder()
  }

  const handleDelete = async (id: string) => {
    await deleteOrder(id);
    fetchOrder()
  }

  return (
    <Layout className="h-screen">
      <AdminSidebar />
      <Layout>
        <AdminHeader />
        <Content className="p-5 bg-gray-100 overflow-auto">
          <div className="bg-white p-5 rounded-lg shadow-md text-center">



            <Table>
            <TableHeader>
              <TableRow className="bg-slate-500 text-white">
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Total Price</TableHead>
                <TableHead>Payment Method</TableHead>



                <TableHead className="text-center"></TableHead>

              </TableRow>
            </TableHeader>
            <TableBody>
              {
                orders && orders.map(order =>
                (order.status != "Canceled" &&  order.status != "Accepted")
                &&
                <TableRow>
                <TableCell className="text-left">{order.contactName}</TableCell>
                <TableCell className="text-left">{order.contactNumber}</TableCell>
                <TableCell className="text-left">{order.totalPrice}</TableCell>
                <TableCell className="text-left">{order.paymentMethod}</TableCell>




                <TableCell className="flex justify-center items-center gap-4">
                  <Trash className="cursor-pointer" onClick={() => handleDelete(order.id)}/>
                  <Button className="bg-green-300 text-white" onClick={() => {
                    updateOrderAccept(order.id)
                    fetchOrder()
                    }}>Accept</Button>
                  <Button className="bg-red-300 text-white" onClick={() => {
                    updateOrderCancel(order.id)
                    fetchOrder()
                  }
                    }>Cancel</Button>
                  <Button className="bg-gray-300 text-white" onClick={() => {
                    updateOrderReturn(order.id)
                    fetchOrder()
                    }}>Return</Button>

                </TableCell>
              </TableRow>
                )
              }

            </TableBody>
          </Table>
          <Dialog open={isOpenUpdate} onOpenChange={setIsOpenUpdate}>

  <DialogContent className="bg-white">
    <DialogHeader>
      <DialogTitle>Chỉnh sửa order</DialogTitle>



    </DialogHeader>
  </DialogContent>
</Dialog>
          </div>
        </Content>
      </Layout>

    </Layout>
  )
}
