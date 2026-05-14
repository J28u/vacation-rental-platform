import { useParams } from "react-router-dom";
import RentalForm from "../components/RentalForm";

export default function UpdateRentalForm() {
  const { id } = useParams<{ id: string }>();
  return <RentalForm mode={"update"} rentalId={Number(id)} />;
}
