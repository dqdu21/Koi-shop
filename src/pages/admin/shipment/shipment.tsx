import { Layout, Typography } from "antd";
import AdminHeader from "../header/AdminHeader";
import AdminSidebar from "../siderbar/AdminSiderbar";
import { GetAllShipment, deleteShipment } from "@/services/shipmentService";
import { useEffect, useState } from "react";
import { Trash, Plus, Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addShipment, updateShipment } from "@/services/shipmentService";
import CredentialForm from "@/components/form/FormCredential";
import { Switch } from "@/components/ui/switch";
import { updateShipmentAccept, updateShipmentCancel, updateShipmentReturn } from "@/services/shipmentService";

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

interface Shipment {
  id: string
  order: []
  orderId: string
  status: string
}

export default function Shipment() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUpdate,setIsOpenUpdate] = useState(false)
  const [isOpenCredential, setIsOpenCredential] = useState(false)
  const [shipments,setShipments] = useState<Shipment[]>([])
  const [shipmentSelected,setShipmentSelected] = useState<any>()
  const fetchShipment = async () => {
    const res = await GetAllShipment();
    console.log('Check: ', res.result.data);
    setShipments(res.result.data);
  }
  useEffect(() => {
    fetchShipment()
  }, [])
  const handleAdd = async (data:any) => {
    await addShipment(data);
    setIsOpen(false)
    fetchShipment()
  }
  const handleUpdate = async (data: any) => {
    await updateShipment(shipmentSelected.id,data)
    setIsOpenUpdate(false);
    fetchShipment()
  }

  const handleDelete = async (id: string) => {
    await deleteShipment(id);
    fetchShipment()
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
                <TableHead>OrderId</TableHead>
                <TableHead></TableHead>
                <TableHead></TableHead>
                <TableHead>Payment Method</TableHead>



                <TableHead className="text-center"></TableHead>

              </TableRow>
            </TableHeader>
            <TableBody>
              {
                shipments && shipments.map(shipment =>


                <TableRow>
                {/* <TableCell className="text-left">{shipment.contactName}</TableCell>
                <TableCell className="text-left">{shipment.contactNumber}</TableCell>
                <TableCell className="text-left">{shipment.totalPrice}</TableCell>
                <TableCell className="text-left">{shipment.paymentMethod}</TableCell> */}




                <TableCell className="flex justify-center items-center gap-4">
                 {
                 (shipment.status== "Canceled") ?
                 <div className="">
                  Cancelled
                 </div>
                 :
                 (shipment.status== "Accepted") ?
                 <div className="">
                 Accepted
                </div>
                :
                  <>
                  <Trash className="cursor-pointer" onClick={() => handleDelete(shipment.id)}/>
                  <Button className="bg-green-300 text-white" onClick={() => {
                    updateShipmentAccept(shipment.id)
                    fetchShipment()
                    }}>Accept</Button>
                  <Button className="bg-red-300 text-white" onClick={() => {
                    updateShipmentCancel(shipment.id)
                    fetchShipment()
                  }
                    }>Cancel</Button>
                  <Button className="bg-gray-300 text-white" onClick={() => {
                    updateShipmentReturn(shipment.id)
                    fetchShipment()
                    }}>Return</Button>
                    </>}

                </TableCell>
              </TableRow>
                )
              }

            </TableBody>
          </Table>
          <Dialog open={isOpenUpdate} onOpenChange={setIsOpenUpdate}>

  <DialogContent className="bg-white">
    <DialogHeader>
      <DialogTitle>Chỉnh sửa shipment</DialogTitle>



    </DialogHeader>
  </DialogContent>
</Dialog>
          </div>
        </Content>
      </Layout>

    </Layout>
  )
}
