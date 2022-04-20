import { object, string, TypeOf } from "zod";

export const loginUserSchema = {
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email."),
    password: string({
      required_error: "Password is required",
    })
      .min(5, "Password must be at least 5 characters long.")
      .max(64, "Password should not be longer than 64 characters."),
  }),
};

export type LoginUserBodyType = TypeOf<typeof loginUserSchema.body>;
