import { NextResponse } from "next/server";
import { BLOB_URL } from "@/lib/constants";

export async function GET() {
  if (!BLOB_URL) {
    return NextResponse.json({ error: "BLOB_URL is not defined" }, { status: 500 });
  }

  try {
    const response = await fetch(BLOB_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch data from BLOB_URL");
    }

    const data = await response.json();
    const parsedContent = JSON.parse(data.content);

    return NextResponse.json({
      sections: parsedContent.sections,
      date: data.date,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error fetching data:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
