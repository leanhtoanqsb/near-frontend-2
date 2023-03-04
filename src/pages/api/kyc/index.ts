import { NextApiRequest, NextApiResponse } from "next";
import Kyc from "@/model/Kyc";
import dbConnect from "@/lib/dbConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method, url } = req;
  const urlParams = new URLSearchParams(url);
  const accountId = urlParams.get("accountId");

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        if (accountId) {
          const pets = await Kyc.find({
            accountId,
          }); /* find all the data in our database */
          res.status(200).json({ success: true, data: pets });
        } else {
          const pets = await Kyc.find(); /* find all the data in our database */
          res.status(200).json({ success: true, data: pets });
        }
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const pet = await Kyc.create(
          req.body
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: pet });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
