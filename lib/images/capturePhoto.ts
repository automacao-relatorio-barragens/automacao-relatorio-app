export async function capturePhoto(): Promise<File> {
  // Try using a file input with camera capture
  try {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    // @ts-ignore capture is not standard on HTMLInputElement
    input.capture = 'environment';

    return await new Promise<File>((resolve, reject) => {
      input.onchange = () => {
        const file = input.files?.[0];
        file ? resolve(file) : reject(new Error('No file selected'));
      };
      input.click();
    });
  } catch (err) {
    // fall back to getUserMedia
  }

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: 'environment' } },
    });
    const track = stream.getVideoTracks()[0];
    // ImageCapture is not widely supported; use canvas if unavailable
    if (typeof (window as any).ImageCapture === 'function') {
      const imageCapture = new (window as any).ImageCapture(track);
      const blob: Blob = await imageCapture.takePhoto();
      track.stop();
      return new File([blob], 'photo.jpg', { type: blob.type });
    } else {
      const video = document.createElement('video');
      video.srcObject = stream;
      await video.play();
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0);
      const blob: Blob = await new Promise((resolve) =>
        canvas.toBlob((b) => resolve(b as Blob), 'image/jpeg')
      );
      track.stop();
      return new File([blob], 'photo.jpg', { type: 'image/jpeg' });
    }
  }

  throw new Error('Camera not available');
}
