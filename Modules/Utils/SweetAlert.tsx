import Swal, { SweetAlertIcon } from "sweetalert2";

interface props {
  title:
    | "Success!"
    | "An error has occurred"
    | "Warning"
    | "Information"
    | "Are you sure?"
    | (string & {});
  message: string;
  icon: SweetAlertIcon;
  showCloseButton?: boolean;
}

export const Sweetalert = ({
  title,
  message,
  icon,
  showCloseButton = true,
}: props) => {
  return Swal.fire({
    title,
    text: message,
    icon,
    showCloseButton,
  });
};
