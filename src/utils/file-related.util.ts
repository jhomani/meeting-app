export const base64ToFile = (base64: string, filename = 'banner.png') => {
  const arr = base64.split(',');
  const mine = arr[0].match(/:(.*?);/);

  const buf = Buffer.from(arr[1], 'base64');

  return new File([buf.buffer], filename, {
    type: mine[1],
  });
};

export const fileToUrl = (file: File) => {
  const size = (file.size ?? 0) / 1024 / 1024;
  const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
  let message: string, src: string;

  if (size > 3) message = 'Tamaño máximo permitido en 3Mb';
  if (!allowedTypes.includes(file.type))
    message = 'Sólo está permitido archivo tipo PNG, JPG y JPEG';

  if (message) src = URL.createObjectURL(file);

  return {error: message, success: src};
};

interface CroppedOptions {
  width: number;
  height: number;
  x: number;
  y: number;
  src: string;
}

export const cropImage = async (options: CroppedOptions) => {
  const widthCrop = 360;
  const heightCrop = 960 * (2.7 / widthCrop);
  const {width, height, x, y, src} = options;
  let base64: string;

  const image = new Image();
  image.crossOrigin = 'Anonymous';
  image.src = src;

  // image.onload = handleLoad;
  await new Promise((resolve) => {
    image.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 960;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(image, x, y, width, height, 0, 0, 960, heightCrop);

        base64 = ctx.canvas.toDataURL();
      } catch (e) {
        console.log(e);
      }

      resolve(undefined);
    };
  });

  image.remove();

  return base64;
};
