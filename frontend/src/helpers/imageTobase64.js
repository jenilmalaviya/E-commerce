export const imageTobase64 = async (image) => {
  const render = new FileReader();
  render.readAsDataURL(image);

  const data = await new Promise((resole, reject) => {
    render.onload = () => {
      resole(render.result);
    };
    render.onerror = (error) => {
      reject(error);
    };
  });
  return data;
};
