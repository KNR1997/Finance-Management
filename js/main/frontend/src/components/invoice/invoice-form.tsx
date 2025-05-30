import { Controller, useForm } from "react-hook-form";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Button from "../ui/button/Button";
import { useNavigate } from "react-router";
import { ERole, Invoice, EStatus, ERequestType } from "../../types";
import SelectInput from "../form/select-input";
import { useAuth } from "../../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateInvoice } from "../../services/invoiceService";
import { createRequest } from "../../services/requestService";

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

const invoiceStatus = [
  { label: "Pending", value: EStatus.PENDING },
  { label: "Completed", value: EStatus.COMPLETED },
];

interface Props {
  initialValues?: Invoice;
}

export default function CreateOrUpdateInvoiceForm({ initialValues }: Props) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    watch,
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

  const updateMutation = useMutation({
    mutationFn: updateInvoice,
    onSuccess: () => {
      navigate("/invoices");
      toast.success("Successfully updated!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const createMutation = useMutation({
    mutationFn: createRequest,
    onSuccess: () => {
      navigate("/requests");
      toast.success("Successfully created!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const onSubmit = async (values: FormValues) => {
    const input = {
      invoiceNumber: values.invoiceNumber,
      value: values.value,
      fgsStatus: values.fgsStatus,
      territoryStatus: values.territoryStatus,
    };

    if (initialValues) {
      updateMutation.mutate({ id: initialValues.id, input });
    }
  };

  const enableFGStatusEdit = (): boolean => {
    const fgsStatus = watch("fgsStatus");
    return (
      user?.roles?.includes(ERole.ROLE_FINISH_GOOD) &&
      fgsStatus != EStatus.COMPLETED
    );
  };

  const enableTerritoryStatusEdit = (): boolean => {
    const territoryStatus = watch("territoryStatus");

    return (
      user?.roles?.includes(ERole.ROLE_FINANCE) &&
      territoryStatus != EStatus.COMPLETED
    );
  };

  const showEditButton = (): boolean => {
    return (
      user?.roles?.includes(ERole.ROLE_FINISH_GOOD) ||
      user?.roles?.includes(ERole.ROLE_FINANCE)
    );
  };

  const showRequestEditFgStatusButton = (): boolean => {
    return (
      user?.roles?.includes(ERole.ROLE_FINISH_GOOD_HEAD) &&
      initialValues?.fgsStatus == EStatus.COMPLETED
    );
  };

  const showRequestEditFinanceStatusButton = (): boolean => {
    return (
      user?.roles?.includes(ERole.ROLE_FINANCE_HEAD) &&
      initialValues?.territoryStatus == EStatus.COMPLETED
    );
  };

  const handleRequestEditFgStatus = () => {
    if (initialValues) {
      const input = {
        invoiceId: initialValues?.id,
        requestType: ERequestType.FG_REQUEST,
      };
      createMutation.mutate(input);
    }
  };

  const handleRequestEditFinanceStatus = () => {
    if (initialValues) {
      const input = {
        invoiceId: initialValues?.id,
        requestType: ERequestType.FINANCE_REQUEST,
      };
      createMutation.mutate(input);
    }
  };

  return (
    <>
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
              Finance(Status) <span className="text-error-500">*</span>
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
          {showEditButton() && (
            <Button size="sm">
              {initialValues ? "Update" : "Create"} Invoice
            </Button>
          )}
        </div>
      </form>
      {showRequestEditFgStatusButton() && (
        <Button
          className="mt-5"
          size="sm"
          onClick={() => handleRequestEditFgStatus()}
        >
          Request FG status Edit
        </Button>
      )}

      {showRequestEditFinanceStatusButton() && (
        <Button
          className="mt-5"
          size="sm"
          onClick={() => handleRequestEditFinanceStatus()}
        >
          Request Finance status Edit
        </Button>
      )}
    </>
  );
}
