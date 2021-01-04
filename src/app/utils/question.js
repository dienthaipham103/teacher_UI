export const initQuestion = questions => {
  if (!questions) return [];
  return questions.map((q, i) => ({ ...q, number: i }));
};

export const convertStringToArray = answers => {
  if (!answers) return [];
  return answers
    .split("")
    .map(a => +a)
    .sort((a, b) => a - b);
};

export const isDoingTestDone = score => {
  if (score === undefined || score === null) return false;
  else return true;
};
