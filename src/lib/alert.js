import Swal from "sweetalert2";

export const alertSucces = async (message) => {
  return Swal.fire({
    icon: "success",
    title: "Success",
    text: message,
    confirmButtonText: "OK",
    customClass: {
      popup: "bg-base-100 border border-base-300 shadow-lg rounded-lg",
      title: "text-lg font-bold text-base-content",
      content: "text-base-content",
      confirmButton: "btn btn-success",
    },
    buttonsStyling: false,
  });
};

export const alertError = async (message) => {
  return Swal.fire({
    icon: "error",
    title: "Oops!",
    text: message,
    confirmButtonText: "OK",
    customClass: {
      popup: "bg-base-100 border border-base-300 shadow-lg rounded-lg",
      title: "text-lg font-bold text-base-content",
      content: "text-base-content",
      confirmButton: "btn btn-error",
    },
    buttonsStyling: false,
  });
};

export const alertConfirm = async (message) => {
  const result = await Swal.fire({
    icon: "question",
    title: "Confirm",
    text: message,
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    confirmButtonColor: "#FF0000",
    customClass: {
      popup: "bg-base-100 border border-base-300 shadow-lg rounded-lg",
      title: "text-lg font-bold text-base-content",
      content: "text-base-content",
      confirmButton: "btn btn-success mr-2",
      cancelButton: "btn btn-error",
    },
    buttonsStyling: false,
  });

  return result.isConfirmed;
};
