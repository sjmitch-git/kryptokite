import { NextResponse } from "next/server";
import { list } from "@vercel/blob";
const token = process.env.BLOB_READ_WRITE_TOKEN;

const folderPath = `kk/news/`;

export async function GET() {
  try {
    const data = await list({
      prefix: folderPath,
      token: token,
    });

    const latestBlob = data.blobs[data.blobs.length - 1]

    return NextResponse.json(latestBlob, { status: 200 });
  } catch (error) {
    console.error("Error fetching blobs:", error);
    return NextResponse.json({ error: "Failed to fetch blobs" }, { status: 500 });
  }
}
