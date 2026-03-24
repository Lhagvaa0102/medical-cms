import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  // PPT болон PDF файл upload хийх route
  pptUploader: f({
    "application/pdf": { maxFileSize: "32MB", maxFileCount: 1 },
    "application/vnd.ms-powerpoint": { maxFileSize: "32MB", maxFileCount: 1 },
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      {
        maxFileSize: "32MB",
        maxFileCount: 1,
      },
  })
    .middleware(async () => {
      // TODO: Admin auth шалгах
      // const user = await getServerSession();
      // if (!user || user.role !== "admin") throw new UploadThingError("Unauthorized");
      return {};
    })
    .onUploadComplete(async ({ file }) => {
      console.log("[UPLOADTHING] upload complete:", file.url);
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
