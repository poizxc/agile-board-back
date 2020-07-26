const checkIfIssueCantBeUpdated = (previousStatus, nextStatus) => {
  if (previousStatus === 'PENDING' && nextStatus === 'TODO') {
    return true;
  }
  if (previousStatus === 'CLOSED' && nextStatus !== 'CLOSED') {
    return true;
  }
  return false;
};

module.exports = {
  checkIfIssueCantBeUpdated,
};
