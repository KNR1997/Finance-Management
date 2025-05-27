import { Controller, useForm } from "react-hook-form";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../ui/button/Button";
import axios from "axios";
import { useNavigate } from "react-router";
import SelectInput from "../form/select-input";
import { User } from "../../types";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: string;
  password: string;
};

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  role: "",
  password: "",
};

const validationSchema = yup.object().shape({
  firstName: yup.string().required("FirstName is required"),
  lastName: yup.string().required("LastName is required"),
  email: yup.string().required("Email is required"),
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const roleOptions = [
  { value: "ROLE_ADMIN", label: "Admin" },
  { value: "ROLE_FINISH_GOOD", label: "Finish Good" },
  { value: "ROLE_FINANCE", label: "Finance" },
];

interface Props {
  initialValues?: User;
}

export default function CreateOrUpdateUserForm({ initialValues }: Props) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  console.log("initialValues: ", initialValues);

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
          role: roleOptions.find((role) => role.value === "ROLE_FINISH_GOOD"),
        }
      : defaultValues,
    //@ts-ignore
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (values: FormValues) => {
    const input = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      username: values.username,
      role: values.role,
      password: values.password,
    };

    console.log("input: ", input);

    try {
      if (!initialValues) {
        const res = await axios.post("http://localhost:8080/api/users", input, {
          headers: { Authorization: `Bearer ${token}` },
        });
        navigate("/users"); // ✅ Redirect after login
      } else {
        const res = await axios.put(
          `http://localhost:8080/api/users/${initialValues.id}`,
          input,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        navigate("/users"); // ✅ Redirect after login
      }
    } catch (err) {
      alert("Something went wrong!!!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <div>
          <Label>
            First Name <span className="text-error-500">*</span>{" "}
          </Label>
          <Input
            placeholder="John"
            {...register("firstName")}
            errorMessage={errors.firstName?.message!}
          />
        </div>
        <div>
          <Label>
            Last Name <span className="text-error-500">*</span>{" "}
          </Label>
          <Input
            placeholder="Doe"
            {...register("lastName")}
            errorMessage={errors.lastName?.message!}
          />
        </div>
        <div>
          <Label>
            Email <span className="text-error-500">*</span>{" "}
          </Label>
          <Input
            placeholder="user@example.com"
            {...register("email")}
            errorMessage={errors.email?.message!}
          />
        </div>
        <div>
          <Label>
            Username <span className="text-error-500">*</span>{" "}
          </Label>
          <Input
            placeholder="user123"
            {...register("username")}
            errorMessage={errors.username?.message!}
          />
        </div>
        <div>
          <Label>
            Role <span className="text-error-500">*</span>
          </Label>
          <Controller
            name="role"
            control={control}
            rules={{ required: "Role is required" }}
            render={({ field }) => (
              <SelectInput
                options={roleOptions}
                placeholder="Select Option"
                value={field.value}
                onChange={field.onChange}
                className="dark:bg-dark-900"
              />
            )}
          />
          {errors.role && (
            <p className="text-error-500 text-sm mt-1">{errors.role.message}</p>
          )}
        </div>
        <div>
          <Label>
            Password <span className="text-error-500">*</span>{" "}
          </Label>
          <Input
            type="password"
            // placeholder="user"
            {...register("password")}
            errorMessage={errors.password?.message!}
          />
        </div>
        <Button size="sm">{initialValues ? "Update" : "Create"} User</Button>
      </div>
    </form>
  );
}
