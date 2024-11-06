import { Layout, Typography } from "antd";
import AdminHeader from "../header/AdminHeader";
import AdminSidebar from "../siderbar/AdminSiderbar";
import { GetAllProduct } from "@/services/productService";
import { useEffect, useState } from "react";
const { Content } = Layout;
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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

            <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
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
