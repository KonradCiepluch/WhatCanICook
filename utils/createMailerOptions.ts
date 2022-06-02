const createMailerOptions = (email: string) => {
  const options = {
    method: 'POST',

    headers: {
      Accept: 'application/json',

      'X-MailerLite-ApiDocs': 'true',

      'Content-Type': 'application/json',

      'X-MailerLite-ApiKey': process.env.mailerApiKey,
    },

    body: JSON.stringify({ email, resubscribe: false, autoresponders: true, type: 'active', group_name: 'recipes' }),
  };

  return options;
};

export default createMailerOptions;
