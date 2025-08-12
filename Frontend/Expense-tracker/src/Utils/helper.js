export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const getInitials = (name) => {
    if(!name) return "";

    const words = name.split("");
    let initials = "";

    for(let i = 0;i < Mat.min(words.length,2);i++){
        initials += words [i][0];
    }

    return initials.toUpperCase();
}

export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

export const prepareExpenseBarChartData = (transactions) => {
  if (!transactions || !Array.isArray(transactions)) return [];

  const expenseMap = {};

  transactions.forEach(({ date, amount }) => {
    const day = new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    expenseMap[day] = (expenseMap[day] || 0) + amount;
  });

  return Object.keys(expenseMap).map((label) => ({
    label,
    value: expenseMap[label],
  }));
};

