import { Layout, Typography } from "antd";
import AdminHeader from "../header/AdminHeader";
import AdminSidebar from "../siderbar/AdminSiderbar";
import { GetAllProduct } from "@/services/productService";
import { useEffect, useState } from "react";
import { Trash, Plus, Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import KoiFishForm from "@/components/form/FormProduct";
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

interface Product {
  id: number | string
  name: string
  description: string
  weight: number
  gender: string
  price: number
}

export default function Product() {
  const [products,setProducts] = useState<Product[]>([])
  const fetchProduct = async () => {
    const res = await GetAllProduct()
    setProducts(res.result.data);
  }
  useEffect(() => {
    fetchProduct()
  }, [])

  return (
    <Layout className="h-screen">
      <AdminSidebar />
      <Layout>
        <AdminHeader />
        <Content className="p-5 bg-gray-100 overflow-auto">
          <div className="bg-white p-5 rounded-lg shadow-md text-center">

            <div className="flex justify-end py-4">
            <Dialog>
  <DialogTrigger>
  <Button className="rounded-full bg-green-500 text-white flex">
              <Plus />
              Thêm
            </Button>
  </DialogTrigger>
  <DialogContent className="bg-white">
    <DialogHeader>
      <DialogTitle>Thêm sản phẩm mới</DialogTitle>



    </DialogHeader>
    <KoiFishForm />
  </DialogContent>
</Dialog>

            </div>

            <Table>
            <TableHeader>
              <TableRow className="bg-slate-500 text-white">
                <TableHead>Name</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-center">Chi tiết</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                products && products.map(product =>
                  <TableRow>
                <TableCell className="text-left">{product.name}</TableCell>
                <TableCell className="text-left">{product.gender}</TableCell>
                <TableCell className="text-left">{product.weight}</TableCell>
                <TableCell className="text-left">{product.description}</TableCell>
                <TableCell className="text-left">{product.price}</TableCell>
                <TableCell className="flex justify-center gap-4">
                  <Trash className="cursor-pointer"/>
                  <Pen className="cursor-pointer" />
                </TableCell>
              </TableRow>
                )
              }

            </TableBody>
          </Table>

          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
