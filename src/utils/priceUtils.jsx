import React from 'react';

export const getDiscountedPrice = (priceParam, discountRatioParam) => {
  const discountRatio = parseInt(discountRatioParam);
  const price = parseInt(priceParam);
  return price - Math.ceil(discountRatio * price / 100);
}