import dbConnect from "@/lib/dbConnect";
import Kyc from "@/model/Kyc";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET" /* Get a model by its ID */:
      try {
        const kyc = await Kyc.findById(id);
        if (!kyc) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: kyc });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT" /* Edit a model by its ID */:
      try {
        const kyc = await Kyc.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!kyc) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: kyc });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE" /* Delete a model by its ID */:
      try {
        const deletedkyc = await Kyc.deleteOne({ _id: id });
        if (!deletedkyc) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
