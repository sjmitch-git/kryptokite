import { NextResponse } from "next/server";
import { list } from "@vercel/blob";
const token = process.env.BLOB_READ_WRITE_TOKEN;

const folderPath = `kk/news/`;

let cachedBlob: { url: string; pathname: string; size: number; uploadedAt: Date } | null = null;

export async function GET() {
  if (cachedBlob) {
    return NextResponse.json(cachedBlob, { status: 200 });
  }

  try {
    const data = await list({
      prefix: folderPath,
      token: token,
    });

    const sortedBlobs = data.blobs.sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );

    const latestBlob = sortedBlobs[0];
    cachedBlob = latestBlob;

    return NextResponse.json(latestBlob, { status: 200 });
  } catch (error) {
    console.error("Error fetching blobs:", error);
    return NextResponse.json({ error: "Failed to fetch blobs" }, { status: 500 });
  }
}
