function twoSum(nums, target) {
  // your code here
  const map = new Map() //創建一個 Map 物件來記錄出現過的數字
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i] //計算補數
    if (map.has(complement)) {
      //如果補數已經在 Map 中出現過
      return [map.get(complement), i] //答案
    }
    map.set(nums[i], i) //否則把該數字存入 Map 中
    // console.log(map)
  }
}

//參考:https://ithelp.ithome.com.tw/articles/10196113

/*
For example:
twoSum([2, 7, 11, 15], 9);
Should returns:
[0, 1]
Because:
nums[0]+nums[1] is 9
*/
