import { capturePhoto } from '../capturePhoto';

describe('capturePhoto', () => {
  it('resolves with selected file', async () => {
    const file = new File(['data'], 'test.jpg', { type: 'image/jpeg' });
    const mockInput: any = {
      files: [file],
      click: jest.fn(),
      onchange: null,
    };
    jest
      .spyOn(document, 'createElement')
      .mockReturnValue(mockInput as HTMLInputElement);
    const promise = capturePhoto();
    mockInput.onchange();
    const result = await promise;
    expect(result).toBe(file);
    (document.createElement as jest.Mock).mockRestore();
  });
});
