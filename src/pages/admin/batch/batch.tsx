import { Layout, Typography } from "antd";
import AdminHeader from "../header/AdminHeader";
import AdminSidebar from "../siderbar/AdminSiderbar";
import { GetAllBatch, deleteBatch } from "@/services/batchService";

import { getProduct } from "@/services/productService";
import { useEffect, useState } from "react";
import { Trash, Plus, Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addBatch, updateBatch } from "@/services/batchService";
import CredentialForm from "@/components/form/FormCredential";

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
import BatchForm from "@/components/form/FormBatch";

interface Batch {
  id:  string
  name: string
  description: string
  price: number
  products: []
}

export default function Batch() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUpdate,setIsOpenUpdate] = useState(false)
  const [isOpenCredential, setIsOpenCredential] = useState(false)
  const [batchs,setBatchs] = useState<Batch[]>([])
  const [batchSelected,setBatchSelected] = useState<any>()
  const fetchBatch = async () => {
    const res = await GetAllBatch();
    console.log('Batch: ',res.result.data);
    setBatchs(res.result.data);
  }
  useEffect(() => {
    fetchBatch()
  }, [])
  const handleAdd = async (data:any) => {
    await addBatch(data);
    setIsOpen(false)
    fetchBatch()
  }
  const handleUpdate = async (data: any) => {
    await updateBatch(batchSelected.id,data)
    setIsOpenUpdate(false);
    fetchBatch()
  }
  const handleDelete = async (id: string) => {
    await deleteBatch(id);
    fetchBatch()
  }

  return (
    <Layout className="h-screen">
      <AdminSidebar />
      <Layout>
        <AdminHeader />
        <Content className="p-5 bg-gray-100 overflow-auto">
          <div className="bg-white p-5 rounded-lg shadow-md text-center">

            <div className="flex justify-end py-4">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger>
  <Button className="rounded-full bg-green-500 text-white flex">
              <Plus />
              Thêm
            </Button>
  </DialogTrigger>
  <DialogContent className="bg-white">
    <DialogHeader>
      <DialogTitle>Thêm batch mới</DialogTitle>



    </DialogHeader>
    <BatchForm handleSubmit={handleAdd}/>
  </DialogContent>
</Dialog>

            </div>

            <Table>
            <TableHeader>
              <TableRow className="bg-slate-500 text-white">
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Products</TableHead>

                <TableHead className="text-center"></TableHead>

              </TableRow>
            </TableHeader>
            <TableBody>
              {
                batchs && batchs.map(batch =>
                  (<TableRow>
                <TableCell className="text-left">{batch.name}</TableCell>
                <TableCell className="text-left">{batch.description}</TableCell>
                <TableCell className="text-left">{batch.price}</TableCell>
                <TableCell className="text-left">
                  <ul>{batch.products.map((product : any) => (
                  <li>{product.name}</li>
                ))}
                </ul>
                </TableCell>

                <TableCell className="flex justify-center gap-4">
                  <Trash className="cursor-pointer" onClick={() => handleDelete(batch.id)}/>
                  <Pen className="cursor-pointer" onClick={() => {
                    setBatchSelected({...batch})
                    setIsOpenUpdate(true)
                    }}/>

                </TableCell>
              </TableRow>)
                )
              }

            </TableBody>
          </Table>
          <Dialog open={isOpenUpdate} onOpenChange={setIsOpenUpdate}>

  <DialogContent className="bg-white">
    <DialogHeader>
      <DialogTitle>Chỉnh sửa batch</DialogTitle>



    </DialogHeader>
    <BatchForm handleSubmit={handleUpdate} initialData={batchSelected}/>
  </DialogContent>
</Dialog>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
