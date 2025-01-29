import Response from "@/lib/api.response";
import { prisma } from "@/lib/prisma";
import validateAuthHeader from "@/utils/validateAuthHeader";
import { NextRequest } from "next/server";

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
      take: size,
      skip: skip,
    });

    const totalItems = await prisma.book.count({
      where: {
        username: data?.username,
      },
    });

    return Response({
      message: "Get All Books",
      data: {
        paging: {
          page: page,
          total_item: totalItems,
          total_page: Math.ceil(totalItems / size),
        },
        data: books,
      },
    });
  } catch (error) {
    return Response({
      message: "Failed to get Books",
      data: error,
      status: 500,
    });
  }
};
