import {
  Button,
  Container,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { AxiosError } from "axios";
import Head from "next/head";
import React from "react";
import { useMutation } from "react-query";
import { Check, X } from "tabler-icons-react";
import { registerUser } from "../../api";

const Register = () => {
  const { onSubmit, getInputProps } = useForm({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationRules: {
      email: (value: string) => /^\S+@\S+$/.test(value),
      password: (value: string) =>
        value.trim().length >= 5 && value.trim().length <= 64,
      confirmPassword: (value: string, values) => value === values?.password,
    },
    errorMessages: {
      email: "Email must include an @",
      password: "Password must be between 5 and 64 characters",
      confirmPassword: "Passwords don't match",
    },
  });

  const mutation = useMutation<
    string,
    AxiosError,
    Parameters<typeof registerUser>["0"]
  >(registerUser, {
    onSuccess: () => {
      showNotification({
        id: "register",
        title: "Success",
        message: "You've successfully created your account!",
        color: "green",
        icon: <Check size={18} />,
      });
    },
    onError: (error) => {
      console.log(`%cError: ${error.response?.data}`, "color:blue");
      showNotification({
        id: "register",
        title: "Error",
        message: `${error.response?.data}`,
        color: "red",
        icon: <X size={18} />,
      });
    },
  });

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <Container>
        <Title>Register</Title>
        <div></div>
        <Paper withBorder shadow={"md"} p={30} mt={30} radius={"md"}>
          <form onSubmit={onSubmit((values) => mutation.mutate(values))}>
            <Stack>
              <TextInput
                label="Email"
                type="email"
                placeholder="noer@iamthebest.com"
                {...getInputProps("email")}
                required
              />
              <TextInput
                label="Username"
                type="text"
                placeholder="NoerIsTheBest"
                {...getInputProps("username")}
                required
              />
              <PasswordInput
                label="Password"
                placeholder="ThisPassword2Strong4U!"
                {...getInputProps("password")}
                min={5}
                max={64}
                required
              />
              <PasswordInput
                label="Confirm Password"
                placeholder="ThisPassword2Strong4U!"
                {...getInputProps("confirmPassword")}
                min={5}
                max={64}
                required
              />
              <Button type="submit">Register</Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default Register;
