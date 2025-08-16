jest.mock('browser-image-compression', () => {
  const mock = jest.fn().mockResolvedValue(new File(['compressed'], 'file.jpg', { type: 'image/jpeg' }));
  (mock as any).getExifOrientation = jest.fn().mockResolvedValue(1);
  (mock as any).loadImage = jest.fn().mockResolvedValue({});
  (mock as any).drawImageInCanvas = jest.fn();
  (mock as any).canvasToFile = jest
    .fn()
    .mockResolvedValue(new File(['rotated'], 'file.jpg', { type: 'image/jpeg' }));
  return { __esModule: true, default: mock };
});

import imageCompression from 'browser-image-compression';
import { processImage } from '../processImage';

describe('processImage', () => {
  it('processes image with orientation and compression', async () => {
    const file = new File(['data'], 'test.jpg', { type: 'image/jpeg' });
    const result = await processImage(file);
    expect(imageCompression.getExifOrientation).toHaveBeenCalledWith(file);
    expect(result).toBeInstanceOf(File);
  });
});
