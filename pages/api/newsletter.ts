import { NextApiHandler } from 'next';

import createMailerOptions from 'utils/createMailerOptions';

const handler: NextApiHandler = async (req, res) => {
  try {
    const { email } = JSON.parse(req.body);

    const options = createMailerOptions(email);

    const response = await fetch('https://api.mailerlite.com/api/v2/groups/group_name/subscribers', options);

    if (!response.ok) throw new Error(response.statusText);

    res.status(200).send({ success: true });
  } catch (e) {
    res.status(404).json({ error: 'Something went wrong, we are sorry' });
  }
};

export default handler;
