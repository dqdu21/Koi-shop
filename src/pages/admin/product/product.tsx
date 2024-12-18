import { Layout, Typography } from "antd";
import AdminHeader from "../header/AdminHeader";
import AdminSidebar from "../siderbar/AdminSiderbar";
import { GetAllProduct, deleteProduct } from "@/services/productService";
import { useEffect, useState } from "react";
import { Trash, Plus, Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import KoiFishForm from "@/components/form/FormProduct";
import { addProduct, updateProduct, updateIsForSellProduct } from "@/services/productService";
import { getCredentialByProductId, createCredential } from "@/services/credentialService";
import CredentialForm from "@/components/form/FormCredential";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input"; // Sử dụng component Input

const { Content } = Layout;
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Product {
  id: string;
  name: string;
  description: string;
  weight: number;
  gender: string;
  price: number;
  credential: {
    id: string;
    name: string;
    description: string;
  };
  isForSell: boolean;
}

export default function Product() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenCredential, setIsOpenCredential] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [productSelected, setProductSelected] = useState<any>();
  const [searchTerm, setSearchTerm] = useState(""); // State cho tìm kiếm

  const fetchProduct = async () => {
    const res = await GetAllProduct();
    for (const item of res.result.data) {
      const credential = await getCredentialByProductId(item.id);
      item.credential = credential ? credential.data[0] : credential;
    }
    setProducts(res.result.data);
    setFilteredProducts(res.result.data); // Gán dữ liệu vào filteredProducts
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    // Lọc sản phẩm theo tên
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]); // Chạy lại khi searchTerm hoặc products thay đổi

  const handleAdd = async (data: any) => {
    await addProduct(data);
    setIsOpen(false);
    fetchProduct();
  };

  const handleUpdate = async (data: any) => {
    await updateProduct(productSelected.id, data);
    setIsOpenUpdate(false);
    fetchProduct();
  };

  const handleUpdateIsForSell = async (productId: string, isForSell: boolean) => {
    await updateIsForSellProduct(productId, isForSell);
    fetchProduct();
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    fetchProduct();
  };

  const handleCreateCredential = async (data: any) => {
    await createCredential(data);
    setIsOpenCredential(false);
    fetchProduct();
  };

  return (
    <Layout className="h-screen">
      <AdminSidebar />
      <Layout>
        <AdminHeader />
        <Content className="p-5 bg-gray-100 overflow-auto">
          <div className="bg-white p-5 rounded-lg shadow-md text-center">

            {/* Thanh tìm kiếm */}
            <div className="flex justify-between items-center py-4">
              <Input
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-1/3"
              />
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                  <KoiFishForm handleSubmit={handleAdd} />
                </DialogContent>
              </Dialog>
            </div>

            {/* Bảng sản phẩm */}
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-500 text-white">
                  <TableHead>Name</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="">Credential</TableHead>
                  <TableHead className="text-center">Is for sale?</TableHead>
                  <TableHead className="text-center"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="text-left">{product.name}</TableCell>
                    <TableCell className="text-left">{product.gender}</TableCell>
                    <TableCell className="text-left">{product.weight}</TableCell>
                    <TableCell className="text-left">{product.description}</TableCell>
                    <TableCell className="text-left">{product.price}</TableCell>
                    <TableCell className="text-left">
                      {product.credential ? (
                        product.credential.name
                      ) : (
                        <Dialog
                          open={isOpenCredential}
                          onOpenChange={setIsOpenCredential}
                        >
                          <DialogTrigger>
                            <Button>Thêm chứng chỉ</Button>
                          </DialogTrigger>
                          <DialogContent className="bg-white">
                            <DialogHeader>
                              <DialogTitle>Thêm chứng chỉ</DialogTitle>
                            </DialogHeader>
                            <CredentialForm
                              handleSubmit={(data) =>
                                handleCreateCredential({
                                  ...data,
                                  productId: product.id,
                                })
                              }
                            />
                          </DialogContent>
                        </Dialog>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Switch
                        checked={product.isForSell}
                        onCheckedChange={() =>
                          handleUpdateIsForSell(product.id, !product.isForSell)
                        }
                      />
                    </TableCell>
                    <TableCell className="flex justify-center gap-4">
                      <Trash
                        className="cursor-pointer"
                        onClick={() => handleDelete(product.id)}
                      />
                      <Pen
                        className="cursor-pointer"
                        onClick={() => {
                          setProductSelected({
                            ...product,
                            gender: product.gender === "Male" ? 1 : 0,
                          });
                          setIsOpenUpdate(true);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Dialog open={isOpenUpdate} onOpenChange={setIsOpenUpdate}>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle>Chỉnh sửa sản phẩm</DialogTitle>
                </DialogHeader>
                <KoiFishForm
                  handleSubmit={handleUpdate}
                  initialData={productSelected}
                />
              </DialogContent>
            </Dialog>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
