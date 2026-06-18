import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";


export async function POST(req) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");


    if (!file) {
      return NextResponse.json(
        { error: "No file found" },
        { status: 400 }
      );
    }


    // Convert file to buffer
    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);


    // Upload to cloudinary
    const uploadResult = await new Promise((resolve, reject) => {

      cloudinary.uploader.upload_stream(
        {
          folder: "giglance/profile",
        },

        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }

      ).end(buffer);

    });


    return NextResponse.json({
      url: uploadResult.secure_url,
    });


  } catch (error) {

    console.log("UPLOAD ERROR:", error);

    return NextResponse.json(
      {
        error: error.message
      },
      {
        status: 500
      }
    );
  }
}