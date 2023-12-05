exports.paginate = (pages, limites) => {
  const defaultPages = 0;
  const defaultLimites = 5;

  const page = pages > 0 ? parseInt(pages, 10) - 1 : defaultPages;
  const limite = limites ? parseInt(limites, 10) : defaultLimites;
  const offset = page * limite;
  const limit = limite;

  return {
    offset,
    limit
  };
};
