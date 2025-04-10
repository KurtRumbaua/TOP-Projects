nums = [1, 2, 3, 4, 2, 3, 3, 5, 7];

const minimumOperations = function (nums) {
  let operations = 0;
  let workingArray = [...nums];

  while (workingArray.length > 0) {
    let hasDuplicates = false;
    for (let i = 0; i < workingArray.length - 1; i++) {
      for (let j = i + 1; j < workingArray.length; j++) {
        if (workingArray[i] === workingArray[j]) {
          hasDuplicates = true;
          break;
        }
        if (hasDuplicates) break;
      }
    }

    if (!hasDuplicates) {
      return operations;
    }

    const elementsToRemove = Math.min(3, workingArray.length);
    workingArray.splice(0, elementsToRemove);

    operations++;
  }

  return operations;
};

minimumOperations(nums);
