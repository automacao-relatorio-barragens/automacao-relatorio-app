import imageCompression from 'browser-image-compression';

export async function processImage(file: File): Promise<File> {
  const orientation = await imageCompression.getExifOrientation(file);
  const image = await imageCompression.loadImage(file);
  const canvas = document.createElement('canvas');
  imageCompression.drawImageInCanvas(image, canvas, orientation);
  const rotated = await imageCompression.canvasToFile(
    canvas,
    file.type,
    file.name
  );
  const compressed = await imageCompression(rotated, {
    maxSizeMB: 1,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  });
  return new File([compressed], file.name, { type: compressed.type });
}
