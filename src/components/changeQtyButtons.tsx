import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";

type Props = { productId: string };
function ChangeQtyButtons({ productId }: Props) {
  const { getProductById, decQty, incQty } = useStore(
    useShallow((state) => ({
      getProductById: state.getProductById,
      decQty: state.decQty,
      incQty: state.incQty,
    }))
  );
  const product = getProductById(productId);
  return (
    <>
      {product && (
        <div className="flex gap-2 items-center">
          <Button onClick={() => decQty(productId)} size="icon">
            <Minus />
          </Button>
          <p>{product.quantity}</p>
          <Button onClick={() => incQty(productId)} size="icon">
            <Plus />
          </Button>
        </div>
      )}
    </>
  );
}

export default ChangeQtyButtons;
