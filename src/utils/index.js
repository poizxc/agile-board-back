const checkIfIssueCanBeUpdated = (previousStatus, nextStatus) => {
  const isPendingGoingBack =
    previousStatus === 'PENDING' && nextStatus === 'TODO';
  const isClosedGoingBack =
    previousStatus === 'CLOSED' && nextStatus !== 'CLOSED';

  if (isPendingGoingBack || isClosedGoingBack) {
    return false;
  }
  return true;
};

module.exports = {
  checkIfIssueCanBeUpdated,
};
