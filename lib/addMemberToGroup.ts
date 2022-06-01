const addMemberToGroup = async (email: string) => {
  try {
    const response = await fetch('/api/newsletter', { method: 'post', body: JSON.stringify({ email }) });

    if (!response.ok) throw new Error('Coś poszło nie tak. Przepraszamy');
  } catch (e) {
    throw new Error(e.message);
  }
};

export default addMemberToGroup;
