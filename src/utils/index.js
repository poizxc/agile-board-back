const checkIfIssueCantBeUpdated = (previousStatus, nextStatus) => {
  // todo extract logic here
  if (nextStatus === previousStatus) {
    return true;
  }
  if (previousStatus === 'PENDING' && nextStatus !== 'CLOSED') {
    return true;
  }
  if (previousStatus === 'CLOSED') {
    return true;
  }
  return false;
};

module.exports = {
  checkIfIssueCantBeUpdated,
};