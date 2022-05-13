import slugify from 'slugify';

const options = { lower: true };

const getSlug = (url: string) => {
  return slugify(url, options);
};

export default getSlug;
