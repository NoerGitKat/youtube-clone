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
import { cleanNotifications, showNotification } from "@mantine/notifications";
import { AxiosError } from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { Check, X } from "tabler-icons-react";
import { loginUser } from "../../api";
import { QueryKeys } from "../../types";

const Login = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { onSubmit, getInputProps } = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validationRules: {
      email: (value: string) => /^\S+@\S+$/.test(value),
      password: (value: string) =>
        value.trim().length >= 5 && value.trim().length <= 64,
    },
    errorMessages: {
      email: "Email must include an @",
      password: "Password must be between 5 and 64 characters",
    },
  });

  const mutation = useMutation<
    string,
    AxiosError,
    Parameters<typeof loginUser>["0"]
  >(loginUser, {
    onSuccess: () => {
      cleanNotifications();
      showNotification({
        id: "register",
        title: "Success",
        message: "You've successfully logged in!",
        color: "green",
        icon: <Check size={18} />,
      });
      queryClient.prefetchQuery(QueryKeys.me);
      push("/");
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
        <title>Login</title>
      </Head>
      <Container>
        <Title>Login</Title>
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

              <PasswordInput
                label="Password"
                placeholder="ThisPassword2Strong4U!"
                {...getInputProps("password")}
                min={5}
                max={64}
                required
              />

              <Button type="submit">Login</Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default Login;
