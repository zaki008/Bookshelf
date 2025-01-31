import Response from "@/lib/api.response";
import { prisma } from "@/lib/prisma";
import validateAuthHeader from "@/utils/validateAuthHeader";
import fs from "fs";
import path from "path";

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string | number } }
) => {
  try {
    const { id } = params;

    const authValidationResult = validateAuthHeader(req);
    if (authValidationResult.status) {
      return Response(authValidationResult);
    }

    const { data } = authValidationResult;

    const countBook = await prisma.book.count({
      where: {
        username: data?.username,
        id: Number(id),
      },
    });
    if (countBook !== 1) {
      return Response({
        message: "Book Is Not found",
        data: null,
        status: 404,
      });
    }

    await prisma.book.delete({
      where: {
        id: Number(id),
      },
    });
    return Response({
      message: "Book Delete is successfully",
      data: null,
      status: 200,
    });
  } catch (err) {
    return Response({
      message: "Book Delete is failed",
      data: err,
      status: 500,
    });
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string | number } }
) => {
  try {
    let payload = await req.json();
    const { id } = params;

    const authValidationResult = validateAuthHeader(req);
    if (authValidationResult.status) {
      return Response(authValidationResult);
    }

    const { data } = authValidationResult;

    const countBook = await prisma.book.count({
      where: {
        username: data?.username,
        id: Number(id),
      },
    });
    if (countBook !== 1) {
      return Response({
        message: "Book Is Not found",
        data: null,
        status: 404,
      });
    }

    if (
      payload.cover.startsWith("data:image/jpeg;base64,") ||
      payload.cover.startsWith("data:image/png;base64,")
    ) {
      const buffer = Buffer.from(payload.cover.split(",")[1], "base64");

      // Generate random filename untuk cover image
      const randomNumber = Math.floor(Math.random() * 1000000);
      const fileExtension = payload.cover.startsWith("data:image/jpeg")
        ? ".jpg"
        : ".png";
      const filename = `cover_${randomNumber}${fileExtension}`;

      // Tentukan path untuk menyimpan file
      const directoryPath = path.join(process.cwd(), "public/assets");
      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
      }

      const filePath = path.join(directoryPath, filename);

      // Simpan file ke server
      fs.writeFileSync(filePath, buffer);
      payload.cover = `/assets/${filename}`;
    }

    console.log("payload", payload);

    const bookUpdate = await prisma.book.update({
      where: {
        id: Number(id),
      },
      data: {
        title: payload.title,
        author: payload.author,
        isbn: payload.isbn,
        cover: payload.cover,
        category: payload.category,
        status: payload.status,
      },
      select: {
        id: true,
        title: true,
        author: true,
        isbn: true,
        cover: true,
        category: true,
        status: true,
      },
    });

    return Response({
      message: "Book Update is successfully",
      data: bookUpdate,
      status: 200,
    });
  } catch (err: any) {
    if (err.meta.target === "books_isbn_key") {
      return Response({
        message: "Isbn already exists",
        data: null,
        status: 400,
      });
    }
    return Response({
      message: "Book Update is failed",
      data: err,
      status: 500,
    });
  }
};
