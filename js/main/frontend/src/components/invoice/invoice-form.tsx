import { Controller, useForm } from "react-hook-form";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../ui/button/Button";
import axios from "axios";
import { useNavigate } from "react-router";
import { ERole, Invoice, InvoiceStatus, User } from "../../types";
import SelectInput from "../form/select-input";
import { useAuth } from "../../context/AuthContext";

type FormValues = {
  invoiceNumber: string;
  value: string;
  fgsStatus: string;
  territoryStatus: string;
};

const defaultValues = {
  invoiceNumber: "",
  value: "",
  fgsStatus: "",
  territoryStatus: "",
};

// const validationSchema = yup.object().shape({
//   firstName: yup.string().required("FirstName is required"),
//   lastName: yup.string().required("LastName is required"),
//   email: yup.string().required("Email is required"),
//   username: yup.string().required("Username is required"),
//   password: yup.string().required("Password is required"),
// });

const invoiceStatus = [
  { label: "Pending", value: InvoiceStatus.PENDING },
  { label: "Completed", value: InvoiceStatus.COMPLETED },
];

interface Props {
  initialValues?: Invoice;
}

export default function CreateOrUpdateInvoiceForm({ initialValues }: Props) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  console.log("user: ", user);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    // @ts-ignore
    defaultValues: initialValues
      ? {
          ...initialValues,
        }
      : defaultValues,
    //@ts-ignore
    // resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (values: FormValues) => {
    if (initialValues) {
      try {
        const res = await axios.put(
          `http://localhost:8080/api/invoices/${initialValues.id}`,
          values,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        navigate("/invoices"); // ✅ Redirect after login
      } catch (err) {
        alert("Something went wrong!!!");
      }
    }
  };

  const enableFGStatusEdit = (): boolean => {
    return user?.roles?.includes(ERole.ROLE_FINISH_GOOD);
  };

  const enableTerritoryStatusEdit = (): boolean => {
    return user?.roles?.includes(ERole.ROLE_FINANCE);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <div>
          <Label>
            First Name <span className="text-error-500">*</span>{" "}
          </Label>
          <Input
            disabled
            placeholder="Inovice Number"
            {...register("invoiceNumber")}
            errorMessage={errors.invoiceNumber?.message!}
          />
        </div>
        <div>
          <Label>
            Last Name <span className="text-error-500">*</span>{" "}
          </Label>
          <Input
            disabled
            placeholder="Value"
            {...register("value")}
            errorMessage={errors.value?.message!}
          />
        </div>
        <div>
          <Label>
            FG(Status) <span className="text-error-500">*</span>
          </Label>
          <Controller
            name="fgsStatus"
            control={control}
            rules={{ required: "Role is required" }}
            render={({ field }) => (
              <SelectInput
                disabled={!enableFGStatusEdit()}
                options={invoiceStatus}
                placeholder="Select Option"
                value={field.value}
                onChange={field.onChange}
                className="dark:bg-dark-900"
              />
            )}
          />
          {errors.fgsStatus && (
            <p className="text-error-500 text-sm mt-1">
              {errors.fgsStatus.message}
            </p>
          )}
        </div>
        <div>
          <Label>
            Territory(Status) <span className="text-error-500">*</span>
          </Label>
          <Controller
            name="territoryStatus"
            control={control}
            rules={{ required: "Role is required" }}
            render={({ field }) => (
              <SelectInput
                disabled={!enableTerritoryStatusEdit()}
                options={invoiceStatus}
                placeholder="Select Option"
                value={field.value}
                onChange={field.onChange}
                className="dark:bg-dark-900"
              />
            )}
          />
          {errors.territoryStatus && (
            <p className="text-error-500 text-sm mt-1">
              {errors.territoryStatus.message}
            </p>
          )}
        </div>
        <Button size="sm">{initialValues ? "Update" : "Create"} Invoice</Button>
      </div>
    </form>
  );
}
