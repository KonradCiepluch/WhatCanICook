const downloadPdfFile = async (content: string) => {
  try {
    const res = await fetch('/api/pdf', { method: 'post', body: content });

    const file = await res.blob();

    const a = document.createElement('a');

    a.href = URL.createObjectURL(file);

    a.download = 'products.pdf';

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (e) {
    throw new Error(e);
  }
};

export default downloadPdfFile;
