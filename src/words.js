const ads = ["졸린", "귀여운", "예쁜", "잘생긴", "젊은", "빠른"];

const non = ["민기", "경민", "효진", "태섭", "은하", "은진", "예림"];

export const generateSecretCode = () => {
  const len = ads.length;

  const ranNum1 = Math.floor(Math.random() * len);
  const ranNum2 = Math.floor(Math.random() * len);

  const result = ads[ranNum1] + " " + non[ranNum2];

  return result;
};
