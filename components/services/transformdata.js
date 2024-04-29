export const transformedData = (serviceObject) => {
  const {
    service_id,
    name,
    service,
    location,
    description,
    about,
    price,
    rating,
    totalReviews,
    ...rest
  } = serviceObject;

  const imagesArray = [];
  const faqsArray = [];
  const reviewsArray = [];

  Object.entries(rest).forEach(([key, value]) => {
    if (key.startsWith("images/")) {
      imagesArray.push(value);
    } else if (key.startsWith("faqs/")) {
      const [, index, field] = key.split("/");
      if (!faqsArray[index]) {
        faqsArray[index] = {};
      }
      faqsArray[index][field] = value;
    } else if (key.startsWith("reviews/")) {
      const [, index, field] = key.split("/");
      if (!reviewsArray[index]) {
        reviewsArray[index] = {};
      }
      reviewsArray[index][field] = value;
    }
  });

  return {
    service_id,
    name,
    service,
    location,
    description,
    images: imagesArray,
    about,
    price,
    faqs: faqsArray,
    reviews: reviewsArray,
    rating,
    totalReviews,
  };
};
