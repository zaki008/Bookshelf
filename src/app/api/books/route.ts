import Response from "@/lib/api.response";
import { prisma } from "@/lib/prisma";
import validateAuthHeader from "@/utils/validateAuthHeader";
import fs from "fs";
import { NextRequest } from "next/server";
import path from "path";

export const GET = async (req: NextRequest) => {
  try {
    const query = req.nextUrl.searchParams;
    const page = query.get("page") ? parseInt(query.get("page") as string) : 1;
    const size = query.get("size") ? parseInt(query.get("size") as string) : 10;

    const authValidationResult = validateAuthHeader(req);
    if (authValidationResult.status) {
      return Response(authValidationResult);
    }
    const { data } = authValidationResult;
    const skip = (page - 1) * size;

    const books = await prisma.book.findMany({
      where: {
        username: data?.username,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: size,
      skip: skip,
    });

    const totalItems = await prisma.book.count({
      where: {
        username: data?.username,
      },
    });

    const [countTotalBook, countCompletedBook, countUnReadBook, countReadBook] =
      await Promise.all([
        prisma.book.count({
          where: { username: data?.username },
        }),
        prisma.book.count({
          where: { username: data?.username, status: "completed" },
        }),
        prisma.book.count({
          where: { username: data?.username, status: "unread" },
        }),
        prisma.book.count({
          where: { username: data?.username, status: "read" },
        }),
      ]);

    const count = {
      totalBook: countTotalBook,
      complatedBook: countCompletedBook,
      unReadBook: countUnReadBook,
      countReadBook: countReadBook,
    };

    return Response({
      message: "Get All Books",
      data: {
        paging: {
          size: size,
          page: page,
          total_item: totalItems,
          total_page: Math.ceil(totalItems / size),
        },
        data: books,
        countBook: count,
      },
      status: 200,
    });
  } catch (error) {
    return Response({
      message: "Failed to get Books",
      data: error,
      status: 500,
    });
  }
};

export const POST = async (req: Request) => {
  try {
    const payload = await req.json();

    const authValidationResult = validateAuthHeader(req);
    if (authValidationResult.status) {
      return Response(authValidationResult);
    }

    const { data } = authValidationResult;
    payload.username = data?.username;

    const countIsbn = await prisma.book.count({
      where: {
        isbn: payload.isbn,
      },
    });

    if (countIsbn === 1) {
      return Response({
        message: "Isbn already exists",
        data: countIsbn,
        status: 400,
      });
    }

    if (
      !payload.cover ||
      (!payload.cover.startsWith("data:image/jpeg;base64,") &&
        !payload.cover.startsWith("data:image/png;base64,"))
    ) {
      return Response({
        message: "Invalid cover image format",
        data: null,
        status: 400,
      });
    }

    const buffer = Buffer.from(payload.cover.split(",")[1], "base64");

    const randomNumber = Math.floor(Math.random() * 1000000);
    const fileExtension = payload.cover.startsWith("data:image/jpeg")
      ? ".jpg"
      : ".png";
    const filename = `cover_${randomNumber}${fileExtension}`;

    console.log(
      `Generated filename: ${filename}, Title: ${payload.title}, Author: ${payload.author}`
    );

    // Tentukan path untuk menyimpan file
    const directoryPath = path.join(process.cwd(), "public/assets");
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    const filePath = path.join(directoryPath, filename);

    // Simpan file ke server
    fs.writeFileSync(filePath, buffer);
    payload.cover = `/assets/${filename}`;

    const book = await prisma.book.create({
      data: payload,
      select: {
        id: true,
        title: true,
        author: true,
        isbn: true,
        cover: true,
        category: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return Response({
      message: "Book Created successfully",
      data: book,
      status: 201,
    });
  } catch (error) {
    console.log("error", error);
    return Response({
      message: "Book Created failed",
      data: error,
      status: 500,
    });
  }
};
