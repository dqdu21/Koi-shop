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

interface Order {
  id:  string
  name: string
  description: string
  weight: number
  gender: string
  price: number
  credential: {
    id: string
    name: string
    description: string
  }
  isForSell: boolean
}

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
                <TableHead>Gender</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>


                <TableHead className="text-center"></TableHead>

              </TableRow>
            </TableHeader>
            <TableBody>
              {
                orders && orders.map(order =>
                  <TableRow>
                <TableCell className="text-left">{order.contactName}</TableCell>
                <TableCell className="text-left">{order.contactNumber}</TableCell>
                <TableCell className="text-left">{order.weight}</TableCell>
                <TableCell className="text-left">{order.description}</TableCell>
                <TableCell className="text-left">{order.price}</TableCell>



                <TableCell className="flex justify-center gap-4">
                  <Trash className="cursor-pointer" onClick={() => handleDelete(order.id)}/>
                  <Pen className="cursor-pointer" onClick={() => {
                    setOrderSelected({...order, gender: order.gender == "Male" ? 1 : 0})
                    setIsOpenUpdate(true)
                    }}/>

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
