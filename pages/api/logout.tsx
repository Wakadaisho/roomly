import { NextApiRequest, NextApiResponse } from "next";
import nookies, { setCookie, destroyCookie } from "nookies";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  destroyCookie({ res }, "jwt", { path: "/" });
  console.log("Destroy");
  return res.status(200).end();
};
