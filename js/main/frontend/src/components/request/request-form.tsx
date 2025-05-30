import { useForm } from "react-hook-form";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Button from "../ui/button/Button";
import { useNavigate } from "react-router";
import { Request } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateRequest } from "../../services/requestService";

type FormValues = {
  invoiceNumber: string;
  requestType: string;
  response: EResponse;
};

export enum EResponse {
  Accept = "ACCEPT",
  Decline = "DECLINE",
}

interface Props {
  initialValues?: Request;
}

export default function CreateOrUpdateRequestForm({ initialValues }: Props) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    // @ts-ignore
    defaultValues: initialValues
      ? {
          ...initialValues,
        }
      : {
          invoiceNumber: "",
          requestType: "",
          response: EResponse.Accept, // default fallback
        },
    //@ts-ignore
    // resolver: yupResolver(validationSchema),
  });

  const updateMutation = useMutation({
    mutationFn: updateRequest,
    onSuccess: () => {
      navigate("/requests");
      toast.success("Successfully updated!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const onSubmit = async (values: FormValues) => {
    console.log("onsubmit executed");
    const input = {
      id: initialValues?.id,
      invoiceId: initialValues?.invoiceId,
      requestType: values.requestType,
      response: values.response,
    };

    if (initialValues) {
      updateMutation.mutate({ id: initialValues.id, input });
    }
  };

  const handleAccept = () => {
    // setValue("response", EResponse.Accept);

    if (initialValues) {
      const input = {
        id: initialValues.id,
              requestType: initialValues.requestType,

        invoiceId: initialValues?.invoiceId,
        response: EResponse.Accept,
      };
      updateMutation.mutate({ id: initialValues.id, input });
    }
  };

  const handleDecline = () => {
    // setValue("response", EResponse.Decline);

    if (initialValues) {
      const input = {
        id: initialValues.id,
              requestType: initialValues.requestType,

        invoiceId: initialValues?.invoiceId,

        response: EResponse.Decline,
      };
      updateMutation.mutate({ id: initialValues.id, input });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <div>
            <Label>Invoice Number</Label>
            <Input
              disabled
              placeholder="Inovice Number"
              {...register("invoiceNumber")}
              errorMessage={errors.invoiceNumber?.message!}
            />
          </div>
          <div>
            <Label>Request Type</Label>
            <Input
              disabled
              // placeholder="Value"
              {...register("requestType")}
              errorMessage={errors.requestType?.message!}
            />
          </div>
        </div>
      </form>
      <div className="flex gap-5">
        <Button size="sm" onClick={handleAccept}>
          Accept
        </Button>
        <Button size="sm" className="bg-red-500" onClick={handleDecline}>
          Decline
        </Button>
      </div>
    </>
  );
}
