import { readFile } from "fs/promises";
import path from "path";

const galleryDirectory = path.join(process.cwd(), "assets", "gallery");

export default async function handler(request, response) {
  const imageName = Array.isArray(request.query.image)
    ? request.query.image[0]
    : request.query.image;

  if (
    !imageName ||
    path.basename(imageName) !== imageName ||
    !/^IMG_\d+( \(1\))?\.JPG$/i.test(imageName)
  ) {
    return response.status(404).end();
  }

  try {
    const image = await readFile(path.join(galleryDirectory, imageName));
    response.setHeader("Content-Type", "image/jpeg");
    response.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    return response.status(200).send(image);
  } catch {
    return response.status(404).end();
  }
}
