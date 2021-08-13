import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  axios
    .post(
      "http://localhost:1337/auth/local",
      {
        identifier: req.body.identifier,
        password: req.body.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then(function (response) {
      if (response.status === 200) {
        if (req.body.rememberMe) {
          setCookie({ res }, "jwt", response.data.jwt, {
            httpOnly: true,
            secure: true,
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
          });
        } else {
          setCookie({ res }, "jwt", response.data.jwt, {
            httpOnly: true,
            secure: true,

            path: "/",
          });
        }
        return res
          .status(200)
          .json({ result: "success", user: response.data.user });
      } else {
        return res.status(200).json({ result: "error", user: null });
      }
    })
    .catch(function (error) {
      return res.status(200).json({ result: "error", message: error.message });
    });
};
