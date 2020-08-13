var maxArea = function maxArea(heights) {
  var left = 0;
  var right = heights.length - 1;
  var max = 0;

  while (left < right) {
    var now = (right - left) * Math.min(heights[right], heights[left]);
    max = now > max ? now : max;

    if (heights[left] > heights[right]) {
      right--;
      // 跨步免乘
      while (
        heights[right + 1] > heights[right] &&
        heights[left] !== heights[right]
      ) {
        right--;
      }
    } else {
      left++;
      //跨步免乘
      while (
        heights[left - 1] > heights[left] &&
        heights[left] !== heights[right]
      ) {
        left++;
      }
    }
  }

  return max;
};
