function capitalizeWords(str) {
  return str.replace(/(\ba-z)|(-|^)([a-z])/g, function (match, p1, p2, p3) {
    return (p1 || p2) + p3.toUpperCase();
  });
}

export default capitalizeWords;
