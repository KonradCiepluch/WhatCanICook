import { NextApiHandler } from 'next';
import componentToPdfBuffer from 'utils/componentToPdfBuffer';

const handler: NextApiHandler = async (req, res) => {
  try {
    const html = req.body;

    const buffer = await componentToPdfBuffer(html);

    res.setHeader('Content-disposition', 'attachment; filename="article.pdf');

    res.setHeader('Content-Type', 'application/pdf');
    res.status(200).send(buffer);
  } catch (e) {
    res.status(404).json({ error: 'Something went wrong, we are sorry' });
  }
};

export default handler;
