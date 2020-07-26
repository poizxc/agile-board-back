const checkIfIssueCantBeUpdated = (previousStatus, nextStatus) => {
  const isPendingGoingBack =
    previousStatus === 'PENDING' && nextStatus === 'TODO';
  const isClosedGoingBack =
    previousStatus === 'CLOSED' && nextStatus !== 'CLOSED';

  if (isPendingGoingBack || isClosedGoingBack) {
    return true;
  }
  return false;
};

module.exports = {
  checkIfIssueCantBeUpdated,
};
