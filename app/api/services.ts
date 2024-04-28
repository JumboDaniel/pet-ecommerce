// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

const petServicesDataPath = `${process.cwd()}/public/petServices.json`; // Adjust path if needed

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const data = await fs.promises.readFile(petServicesDataPath, "utf-8");
    const services = JSON.parse(data);
    res.status(200).json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve pet services data" });
  }
}
