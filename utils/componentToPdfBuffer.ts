import pdf, { CreateOptions } from 'html-pdf';

const componentToPdfBuffer = (html: string) => {
  return new Promise((resolve, reject) => {
    const options = {
      format: 'A4',
      orientation: 'portrait',
      border: '10mm',
      footer: {
        height: '10mm',
      },
      type: 'pdf',
      timeout: 30000,
    } as CreateOptions;

    pdf.create(html, options).toBuffer((err, buffer) => {
      if (err) reject(err);
      resolve(buffer);
    });
  });
};

export default componentToPdfBuffer;
