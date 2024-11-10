import { Card } from "@/components/ui/card"
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess () {
  const navigate = useNavigate()
  return (
    <div className="flex items-center justify-center h-screen">
       <Card className="bg-[#333333] shadow flex flex-col items-center py-20 px-8 text-white">
      <IoCheckmarkDoneCircle className="text-red-500 size-20 my-8"/>
      <h1 className="font-[Phudu] font-black text-[3em]">Payment succeeded!</h1>
      <p className="font-[Montserrat] text-gray-400">Your transaction was completed successfully. Thank you for your purchase!</p>
      <Button className="bg-red-500 text-white font-[Montserrat] font-semibold my-8" onClick={() => navigate('/')}>
        Go to home
      </Button>
    </Card>
    </div>

  )
}

