// Arrays & Hashing — curated interview problem set with Python solutions.
// Each problem: slug, title, difficulty, pattern, leetcode #, statement,
// examples, approach steps, Python solution, and complexity.

export const arrays = [
  {
    slug: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    pattern: 'Hashing',
    leetcode: 1,
    statement:
      'Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target. Each input has exactly one solution and you may not use the same element twice.',
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'nums[0] + nums[1] == 9.' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]', explanation: 'nums[1] + nums[2] == 6.' },
    ],
    approach: [
      'Iterate once, keeping a hash map of value -> index seen so far.',
      'For each number, check if target - num already exists in the map.',
      'If it does, return the stored index and the current index.',
    ],
    solution: `def two_sum(nums: list[int], target: int) -> list[int]:
    seen = {}  # value -> index
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
    complexity: { time: 'O(n)', space: 'O(n)' },
  },
  {
    slug: 'contains-duplicate',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    pattern: 'Hashing',
    leetcode: 217,
    statement:
      'Given an integer array nums, return True if any value appears at least twice, and False if every element is distinct.',
    examples: [
      { input: 'nums = [1,2,3,1]', output: 'True', explanation: '1 appears twice.' },
      { input: 'nums = [1,2,3,4]', output: 'False', explanation: 'All distinct.' },
    ],
    approach: [
      'A set stores only unique elements.',
      'If the length of the set differs from the list, a duplicate exists.',
    ],
    solution: `def contains_duplicate(nums: list[int]) -> bool:
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False`,
    complexity: { time: 'O(n)', space: 'O(n)' },
  },
  {
    slug: 'best-time-to-buy-and-sell-stock',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    pattern: 'Greedy / Sliding Window',
    leetcode: 121,
    statement:
      'You are given an array prices where prices[i] is the price of a stock on day i. Maximize profit by buying on one day and selling on a later day. Return the max profit, or 0 if none is possible.',
    examples: [
      { input: 'prices = [7,1,5,3,6,4]', output: '5', explanation: 'Buy at 1, sell at 6.' },
      { input: 'prices = [7,6,4,3,1]', output: '0', explanation: 'Prices only fall.' },
    ],
    approach: [
      'Track the minimum price seen so far as the best buy point.',
      'For each price, compute profit if sold today and keep the maximum.',
    ],
    solution: `def max_profit(prices: list[int]) -> int:
    min_price = float('inf')
    best = 0
    for price in prices:
        min_price = min(min_price, price)
        best = max(best, price - min_price)
    return best`,
    complexity: { time: 'O(n)', space: 'O(1)' },
  },
  {
    slug: 'maximum-subarray',
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    pattern: "Kadane's Algorithm",
    leetcode: 53,
    statement:
      'Given an integer array nums, find the contiguous subarray with the largest sum and return that sum.',
    examples: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: 'Subarray [4,-1,2,1].' },
      { input: 'nums = [5,4,-1,7,8]', output: '23', explanation: 'The whole array.' },
    ],
    approach: [
      'Keep a running sum; if it ever goes negative, reset it to the current element.',
      'Track the best sum seen along the way.',
    ],
    solution: `def max_subarray(nums: list[int]) -> int:
    best = nums[0]
    current = nums[0]
    for num in nums[1:]:
        current = max(num, current + num)
        best = max(best, current)
    return best`,
    complexity: { time: 'O(n)', space: 'O(1)' },
  },
  {
    slug: 'product-of-array-except-self',
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    pattern: 'Prefix / Suffix Products',
    leetcode: 238,
    statement:
      'Given an integer array nums, return an array answer where answer[i] is the product of all elements except nums[i], without using division and in O(n) time.',
    examples: [
      { input: 'nums = [1,2,3,4]', output: '[24,12,8,6]', explanation: 'Products excluding each index.' },
      { input: 'nums = [-1,1,0,-3,3]', output: '[0,0,9,0,0]', explanation: 'Zero affects products.' },
    ],
    approach: [
      'First pass: store the running product of everything to the left of i.',
      'Second pass from the right: multiply by the running product of everything to the right.',
    ],
    solution: `def product_except_self(nums: list[int]) -> list[int]:
    n = len(nums)
    answer = [1] * n
    prefix = 1
    for i in range(n):
        answer[i] = prefix
        prefix *= nums[i]
    suffix = 1
    for i in range(n - 1, -1, -1):
        answer[i] *= suffix
        suffix *= nums[i]
    return answer`,
    complexity: { time: 'O(n)', space: 'O(1)' },
  },
  {
    slug: 'maximum-product-subarray',
    title: 'Maximum Product Subarray',
    difficulty: 'Medium',
    pattern: 'Dynamic Programming',
    leetcode: 152,
    statement:
      'Given an integer array nums, find the contiguous subarray that has the largest product and return that product.',
    examples: [
      { input: 'nums = [2,3,-2,4]', output: '6', explanation: 'Subarray [2,3].' },
      { input: 'nums = [-2,0,-1]', output: '0', explanation: 'Best is 0.' },
    ],
    approach: [
      'Track both the max and min product ending at the current index (a negative can flip min to max).',
      'At each step recompute max and min using the current number.',
    ],
    solution: `def max_product(nums: list[int]) -> int:
    best = nums[0]
    cur_max = cur_min = nums[0]
    for num in nums[1:]:
        candidates = (num, cur_max * num, cur_min * num)
        cur_max = max(candidates)
        cur_min = min(candidates)
        best = max(best, cur_max)
    return best`,
    complexity: { time: 'O(n)', space: 'O(1)' },
  },
  {
    slug: 'two-sum-ii-sorted',
    title: 'Two Sum II - Input Array Is Sorted',
    difficulty: 'Medium',
    pattern: 'Two Pointers',
    leetcode: 167,
    statement:
      'Given a 1-indexed sorted array numbers and a target, return the 1-based indices of the two numbers that add up to target. Use O(1) extra space.',
    examples: [
      { input: 'numbers = [2,7,11,15], target = 9', output: '[1,2]', explanation: '2 + 7 == 9.' },
      { input: 'numbers = [2,3,4], target = 6', output: '[1,3]', explanation: '2 + 4 == 6.' },
    ],
    approach: [
      'Place one pointer at the start and one at the end.',
      'If the sum is too large, move the right pointer left; if too small, move left pointer right.',
    ],
    solution: `def two_sum_sorted(numbers: list[int], target: int) -> list[int]:
    left, right = 0, len(numbers) - 1
    while left < right:
        total = numbers[left] + numbers[right]
        if total == target:
            return [left + 1, right + 1]
        if total < target:
            left += 1
        else:
            right -= 1
    return []`,
    complexity: { time: 'O(n)', space: 'O(1)' },
  },
  {
    slug: 'three-sum',
    title: '3Sum',
    difficulty: 'Medium',
    pattern: 'Two Pointers',
    leetcode: 15,
    statement:
      'Given an integer array nums, return all unique triplets [a, b, c] such that a + b + c == 0. The solution set must not contain duplicate triplets.',
    examples: [
      { input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]', explanation: 'Two unique triplets.' },
      { input: 'nums = [0,1,1]', output: '[]', explanation: 'No triplet sums to 0.' },
    ],
    approach: [
      'Sort the array so duplicates are adjacent and two pointers work.',
      'Fix one number, then use two pointers on the rest to find pairs summing to its negation.',
      'Skip duplicate values to avoid repeated triplets.',
    ],
    solution: `def three_sum(nums: list[int]) -> list[list[int]]:
    nums.sort()
    res = []
    n = len(nums)
    for i in range(n - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        left, right = i + 1, n - 1
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            if total < 0:
                left += 1
            elif total > 0:
                right -= 1
            else:
                res.append([nums[i], nums[left], nums[right]])
                left += 1
                right -= 1
                while left < right and nums[left] == nums[left - 1]:
                    left += 1
                while left < right and nums[right] == nums[right + 1]:
                    right -= 1
    return res`,
    complexity: { time: 'O(n^2)', space: 'O(1)' },
  },
  {
    slug: 'container-with-most-water',
    title: 'Container With Most Water',
    difficulty: 'Medium',
    pattern: 'Two Pointers',
    leetcode: 11,
    statement:
      'Given heights of vertical lines, find two lines that together with the x-axis form a container holding the most water. Return the maximum area.',
    examples: [
      { input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49', explanation: 'Lines at index 1 and 8.' },
      { input: 'height = [1,1]', output: '1', explanation: 'Only one container possible.' },
    ],
    approach: [
      'Start with the widest container (pointers at both ends).',
      'Area is limited by the shorter line, so move the shorter pointer inward to seek a taller line.',
    ],
    solution: `def max_area(height: list[int]) -> int:
    left, right = 0, len(height) - 1
    best = 0
    while left < right:
        width = right - left
        best = max(best, width * min(height[left], height[right]))
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    return best`,
    complexity: { time: 'O(n)', space: 'O(1)' },
  },
  {
    slug: 'trapping-rain-water',
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    pattern: 'Two Pointers',
    leetcode: 42,
    statement:
      'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    examples: [
      { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6', explanation: '6 units of water are trapped.' },
      { input: 'height = [4,2,0,3,2,5]', output: '9', explanation: '9 units trapped.' },
    ],
    approach: [
      'Water above each bar is bounded by the smaller of the tallest bar to its left and right.',
      'Use two pointers and track left_max / right_max, always processing the smaller side.',
    ],
    solution: `def trap(height: list[int]) -> int:
    if not height:
        return 0
    left, right = 0, len(height) - 1
    left_max, right_max = height[left], height[right]
    water = 0
    while left < right:
        if left_max < right_max:
            left += 1
            left_max = max(left_max, height[left])
            water += left_max - height[left]
        else:
            right -= 1
            right_max = max(right_max, height[right])
            water += right_max - height[right]
    return water`,
    complexity: { time: 'O(n)', space: 'O(1)' },
  },
  {
    slug: 'merge-intervals',
    title: 'Merge Intervals',
    difficulty: 'Medium',
    pattern: 'Intervals',
    leetcode: 56,
    statement:
      'Given an array of intervals where intervals[i] = [start, end], merge all overlapping intervals and return the non-overlapping intervals that cover all the input.',
    examples: [
      { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]', explanation: '[1,3] and [2,6] overlap.' },
      { input: 'intervals = [[1,4],[4,5]]', output: '[[1,5]]', explanation: 'They touch at 4.' },
    ],
    approach: [
      'Sort intervals by start time.',
      'Walk through; if the current interval overlaps the last merged one, extend its end, else append it.',
    ],
    solution: `def merge(intervals: list[list[int]]) -> list[list[int]]:
    intervals.sort(key=lambda x: x[0])
    merged = []
    for start, end in intervals:
        if merged and start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged`,
    complexity: { time: 'O(n log n)', space: 'O(n)' },
  },
  {
    slug: 'insert-interval',
    title: 'Insert Interval',
    difficulty: 'Medium',
    pattern: 'Intervals',
    leetcode: 57,
    statement:
      'Given a sorted list of non-overlapping intervals and a new interval, insert it and merge if necessary, keeping the list sorted and non-overlapping.',
    examples: [
      { input: 'intervals = [[1,3],[6,9]], newInterval = [2,5]', output: '[[1,5],[6,9]]', explanation: 'Merge [1,3] with [2,5].' },
      { input: 'intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]', output: '[[1,2],[3,10],[12,16]]', explanation: 'Merge overlapping middle intervals.' },
    ],
    approach: [
      'Add all intervals ending before the new one starts.',
      'Merge all intervals that overlap the new one by expanding its bounds.',
      'Add the merged interval, then append the rest.',
    ],
    solution: `def insert(intervals: list[list[int]], new_interval: list[int]) -> list[list[int]]:
    res = []
    i, n = 0, len(intervals)
    start, end = new_interval
    while i < n and intervals[i][1] < start:
        res.append(intervals[i])
        i += 1
    while i < n and intervals[i][0] <= end:
        start = min(start, intervals[i][0])
        end = max(end, intervals[i][1])
        i += 1
    res.append([start, end])
    while i < n:
        res.append(intervals[i])
        i += 1
    return res`,
    complexity: { time: 'O(n)', space: 'O(n)' },
  },
  {
    slug: 'non-overlapping-intervals',
    title: 'Non-overlapping Intervals',
    difficulty: 'Medium',
    pattern: 'Intervals / Greedy',
    leetcode: 435,
    statement:
      'Given an array of intervals, return the minimum number of intervals you must remove to make the rest non-overlapping.',
    examples: [
      { input: 'intervals = [[1,2],[2,3],[3,4],[1,3]]', output: '1', explanation: 'Remove [1,3].' },
      { input: 'intervals = [[1,2],[1,2],[1,2]]', output: '2', explanation: 'Keep one, remove two.' },
    ],
    approach: [
      'Sort by end time so we always keep the interval that frees up the earliest.',
      'Greedily keep an interval if it starts at or after the last kept end; otherwise count a removal.',
    ],
    solution: `def erase_overlap_intervals(intervals: list[list[int]]) -> int:
    intervals.sort(key=lambda x: x[1])
    removals = 0
    prev_end = float('-inf')
    for start, end in intervals:
        if start >= prev_end:
            prev_end = end
        else:
            removals += 1
    return removals`,
    complexity: { time: 'O(n log n)', space: 'O(1)' },
  },
  {
    slug: 'maximum-average-subarray',
    title: 'Maximum Average Subarray I',
    difficulty: 'Easy',
    pattern: 'Sliding Window',
    leetcode: 643,
    statement:
      'Given an array nums and an integer k, find the contiguous subarray of length k with the maximum average and return that average value.',
    examples: [
      { input: 'nums = [1,12,-5,-6,50,3], k = 4', output: '12.75', explanation: 'Window [12,-5,-6,50].' },
      { input: 'nums = [5], k = 1', output: '5.0', explanation: 'Only one window.' },
    ],
    approach: [
      'Compute the sum of the first k elements.',
      'Slide the window by adding the next element and removing the first; track the max sum.',
    ],
    solution: `def find_max_average(nums: list[int], k: int) -> float:
    window = sum(nums[:k])
    best = window
    for i in range(k, len(nums)):
        window += nums[i] - nums[i - k]
        best = max(best, window)
    return best / k`,
    complexity: { time: 'O(n)', space: 'O(1)' },
  },
  {
    slug: 'subarray-sum-equals-k',
    title: 'Subarray Sum Equals K',
    difficulty: 'Medium',
    pattern: 'Prefix Sum + Hashing',
    leetcode: 560,
    statement:
      'Given an integer array nums and an integer k, return the total number of contiguous subarrays whose sum equals k.',
    examples: [
      { input: 'nums = [1,1,1], k = 2', output: '2', explanation: 'Two subarrays [1,1].' },
      { input: 'nums = [1,2,3], k = 3', output: '2', explanation: '[1,2] and [3].' },
    ],
    approach: [
      'Track a running prefix sum.',
      'A subarray sums to k when prefix - k was seen before; count those occurrences with a hash map.',
    ],
    solution: `def subarray_sum(nums: list[int], k: int) -> int:
    count = 0
    prefix = 0
    seen = {0: 1}  # prefix sum -> frequency
    for num in nums:
        prefix += num
        count += seen.get(prefix - k, 0)
        seen[prefix] = seen.get(prefix, 0) + 1
    return count`,
    complexity: { time: 'O(n)', space: 'O(n)' },
  },
  {
    slug: 'move-zeroes',
    title: 'Move Zeroes',
    difficulty: 'Easy',
    pattern: 'Two Pointers',
    leetcode: 283,
    statement:
      'Given an integer array nums, move all 0s to the end while keeping the relative order of the non-zero elements. Do it in place.',
    examples: [
      { input: 'nums = [0,1,0,3,12]', output: '[1,3,12,0,0]', explanation: 'Non-zero order preserved.' },
      { input: 'nums = [0]', output: '[0]', explanation: 'Single element.' },
    ],
    approach: [
      'Keep a write pointer for the next non-zero slot.',
      'Iterate; whenever you see a non-zero, swap it into the write position and advance it.',
    ],
    solution: `def move_zeroes(nums: list[int]) -> None:
    insert = 0
    for i in range(len(nums)):
        if nums[i] != 0:
            nums[insert], nums[i] = nums[i], nums[insert]
            insert += 1`,
    complexity: { time: 'O(n)', space: 'O(1)' },
  },
  {
    slug: 'rotate-array',
    title: 'Rotate Array',
    difficulty: 'Medium',
    pattern: 'Array Manipulation',
    leetcode: 189,
    statement:
      'Given an integer array nums, rotate the array to the right by k steps, where k is non-negative. Do it in place with O(1) extra space.',
    examples: [
      { input: 'nums = [1,2,3,4,5,6,7], k = 3', output: '[5,6,7,1,2,3,4]', explanation: 'Rotated right 3 times.' },
      { input: 'nums = [-1,-100,3,99], k = 2', output: '[3,99,-1,-100]', explanation: 'Rotated right 2 times.' },
    ],
    approach: [
      'Reverse the whole array, then reverse the first k and the remaining n-k elements.',
      'Reduce k modulo n first to handle k larger than the length.',
    ],
    solution: `def rotate(nums: list[int], k: int) -> None:
    n = len(nums)
    k %= n

    def reverse(lo: int, hi: int) -> None:
        while lo < hi:
            nums[lo], nums[hi] = nums[hi], nums[lo]
            lo += 1
            hi -= 1

    reverse(0, n - 1)
    reverse(0, k - 1)
    reverse(k, n - 1)`,
    complexity: { time: 'O(n)', space: 'O(1)' },
  },
  {
    slug: 'sort-colors',
    title: 'Sort Colors',
    difficulty: 'Medium',
    pattern: 'Dutch National Flag',
    leetcode: 75,
    statement:
      'Given an array nums with values 0, 1, and 2 representing colors, sort them in place so equal colors are adjacent and ordered 0, 1, 2. Do it in one pass.',
    examples: [
      { input: 'nums = [2,0,2,1,1,0]', output: '[0,0,1,1,2,2]', explanation: 'Sorted in place.' },
      { input: 'nums = [2,0,1]', output: '[0,1,2]', explanation: 'Sorted in place.' },
    ],
    approach: [
      'Maintain three pointers: low (next 0), mid (current), high (next 2).',
      'Swap 0s to the front and 2s to the back; mid advances over 1s.',
    ],
    solution: `def sort_colors(nums: list[int]) -> None:
    low, mid, high = 0, 0, len(nums) - 1
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1`,
    complexity: { time: 'O(n)', space: 'O(1)' },
  },
  {
    slug: 'majority-element',
    title: 'Majority Element',
    difficulty: 'Easy',
    pattern: 'Boyer-Moore Voting',
    leetcode: 169,
    statement:
      'Given an array nums of size n, return the majority element — the element that appears more than n // 2 times. You may assume it always exists.',
    examples: [
      { input: 'nums = [3,2,3]', output: '3', explanation: '3 appears twice.' },
      { input: 'nums = [2,2,1,1,1,2,2]', output: '2', explanation: '2 appears four times.' },
    ],
    approach: [
      'Maintain a candidate and a count.',
      'Increment count when the value matches the candidate, decrement otherwise; reset candidate at zero.',
    ],
    solution: `def majority_element(nums: list[int]) -> int:
    candidate = None
    count = 0
    for num in nums:
        if count == 0:
            candidate = num
        count += 1 if num == candidate else -1
    return candidate`,
    complexity: { time: 'O(n)', space: 'O(1)' },
  },
  {
    slug: 'longest-consecutive-sequence',
    title: 'Longest Consecutive Sequence',
    difficulty: 'Medium',
    pattern: 'Hashing',
    leetcode: 128,
    statement:
      'Given an unsorted array nums, return the length of the longest run of consecutive integers. The algorithm must run in O(n).',
    examples: [
      { input: 'nums = [100,4,200,1,3,2]', output: '4', explanation: 'Sequence [1,2,3,4].' },
      { input: 'nums = [0,3,7,2,5,8,4,6,0,1]', output: '9', explanation: 'Sequence 0..8.' },
    ],
    approach: [
      'Put all numbers in a set for O(1) lookups.',
      'Only start counting from numbers that have no predecessor (num - 1 not in set).',
    ],
    solution: `def longest_consecutive(nums: list[int]) -> int:
    num_set = set(nums)
    best = 0
    for num in num_set:
        if num - 1 not in num_set:
            length = 1
            while num + length in num_set:
                length += 1
            best = max(best, length)
    return best`,
    complexity: { time: 'O(n)', space: 'O(n)' },
  },
  {
    slug: 'spiral-matrix',
    title: 'Spiral Matrix',
    difficulty: 'Medium',
    pattern: 'Matrix Traversal',
    leetcode: 54,
    statement:
      'Given an m x n matrix, return all elements of the matrix in spiral order (clockwise starting from the top-left).',
    examples: [
      { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[1,2,3,6,9,8,7,4,5]', explanation: 'Clockwise spiral.' },
      { input: 'matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]', output: '[1,2,3,4,8,12,11,10,9,5,6,7]', explanation: 'Clockwise spiral.' },
    ],
    approach: [
      'Maintain four boundaries: top, bottom, left, right.',
      'Walk right, down, left, up; shrink the matching boundary after each pass.',
    ],
    solution: `def spiral_order(matrix: list[list[int]]) -> list[int]:
    res = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1
    while top <= bottom and left <= right:
        for col in range(left, right + 1):
            res.append(matrix[top][col])
        top += 1
        for row in range(top, bottom + 1):
            res.append(matrix[row][right])
        right -= 1
        if top <= bottom:
            for col in range(right, left - 1, -1):
                res.append(matrix[bottom][col])
            bottom -= 1
        if left <= right:
            for row in range(bottom, top - 1, -1):
                res.append(matrix[row][left])
            left += 1
    return res`,
    complexity: { time: 'O(m*n)', space: 'O(1)' },
  },
  {
    slug: 'set-matrix-zeroes',
    title: 'Set Matrix Zeroes',
    difficulty: 'Medium',
    pattern: 'Matrix',
    leetcode: 73,
    statement:
      'Given an m x n matrix, if an element is 0, set its entire row and column to 0. Do it in place using O(1) extra space.',
    examples: [
      { input: 'matrix = [[1,1,1],[1,0,1],[1,1,1]]', output: '[[1,0,1],[0,0,0],[1,0,1]]', explanation: 'Middle zero clears its row and column.' },
      { input: 'matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]', output: '[[0,0,0,0],[0,4,5,0],[0,3,1,0]]', explanation: 'Zeros propagate.' },
    ],
    approach: [
      'Use the first row and column as markers for which rows/columns must be zeroed.',
      'Track separately whether the first row and first column themselves need zeroing, then apply.',
    ],
    solution: `def set_zeroes(matrix: list[list[int]]) -> None:
    rows, cols = len(matrix), len(matrix[0])
    first_row_zero = any(matrix[0][c] == 0 for c in range(cols))
    first_col_zero = any(matrix[r][0] == 0 for r in range(rows))
    for r in range(1, rows):
        for c in range(1, cols):
            if matrix[r][c] == 0:
                matrix[r][0] = 0
                matrix[0][c] = 0
    for r in range(1, rows):
        for c in range(1, cols):
            if matrix[r][0] == 0 or matrix[0][c] == 0:
                matrix[r][c] = 0
    if first_row_zero:
        for c in range(cols):
            matrix[0][c] = 0
    if first_col_zero:
        for r in range(rows):
            matrix[r][0] = 0`,
    complexity: { time: 'O(m*n)', space: 'O(1)' },
  },
  {
    slug: 'rotate-image',
    title: 'Rotate Image',
    difficulty: 'Medium',
    pattern: 'Matrix',
    leetcode: 48,
    statement:
      'Given an n x n 2D matrix representing an image, rotate it 90 degrees clockwise in place.',
    examples: [
      { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[[7,4,1],[8,5,2],[9,6,3]]', explanation: 'Rotated 90 clockwise.' },
      { input: 'matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]', output: '[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]', explanation: 'Rotated 90 clockwise.' },
    ],
    approach: [
      'Transpose the matrix (swap across the main diagonal).',
      'Reverse each row to complete the clockwise rotation.',
    ],
    solution: `def rotate_image(matrix: list[list[int]]) -> None:
    n = len(matrix)
    for r in range(n):
        for c in range(r + 1, n):
            matrix[r][c], matrix[c][r] = matrix[c][r], matrix[r][c]
    for row in matrix:
        row.reverse()`,
    complexity: { time: 'O(n^2)', space: 'O(1)' },
  },
  {
    slug: 'merge-sorted-array',
    title: 'Merge Sorted Array',
    difficulty: 'Easy',
    pattern: 'Two Pointers',
    leetcode: 88,
    statement:
      'Given two sorted arrays nums1 (length m + n, with the last n slots as zeros) and nums2 (length n), merge nums2 into nums1 as one sorted array in place.',
    examples: [
      { input: 'nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3', output: '[1,2,2,3,5,6]', explanation: 'Merged in order.' },
      { input: 'nums1 = [1], m = 1, nums2 = [], n = 0', output: '[1]', explanation: 'Nothing to merge.' },
    ],
    approach: [
      'Fill nums1 from the back to avoid overwriting unmerged values.',
      'Compare the largest remaining elements of each array and place the bigger one at the end.',
    ],
    solution: `def merge_sorted(nums1: list[int], m: int, nums2: list[int], n: int) -> None:
    i, j, k = m - 1, n - 1, m + n - 1
    while j >= 0:
        if i >= 0 and nums1[i] > nums2[j]:
            nums1[k] = nums1[i]
            i -= 1
        else:
            nums1[k] = nums2[j]
            j -= 1
        k -= 1`,
    complexity: { time: 'O(m+n)', space: 'O(1)' },
  },
  {
    slug: 'search-in-rotated-sorted-array',
    title: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    pattern: 'Binary Search',
    leetcode: 33,
    statement:
      'Given a rotated ascending sorted array nums with distinct values and a target, return its index, or -1 if it is not present. Must run in O(log n).',
    examples: [
      { input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4', explanation: '0 is at index 4.' },
      { input: 'nums = [4,5,6,7,0,1,2], target = 3', output: '-1', explanation: '3 is absent.' },
    ],
    approach: [
      'At each step one half [lo..mid] or [mid..hi] is sorted.',
      'Detect the sorted half and check whether the target lies within it to decide which side to keep.',
    ],
    solution: `def search(nums: list[int], target: int) -> int:
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        if nums[lo] <= nums[mid]:
            if nums[lo] <= target < nums[mid]:
                hi = mid - 1
            else:
                lo = mid + 1
        else:
            if nums[mid] < target <= nums[hi]:
                lo = mid + 1
            else:
                hi = mid - 1
    return -1`,
    complexity: { time: 'O(log n)', space: 'O(1)' },
  },
  {
    slug: 'find-minimum-in-rotated-sorted-array',
    title: 'Find Minimum in Rotated Sorted Array',
    difficulty: 'Medium',
    pattern: 'Binary Search',
    leetcode: 153,
    statement:
      'A sorted ascending array was rotated some number of times. Given such an array of unique elements, return the minimum element in O(log n).',
    examples: [
      { input: 'nums = [3,4,5,1,2]', output: '1', explanation: 'Rotated 3 times.' },
      { input: 'nums = [4,5,6,7,0,1,2]', output: '0', explanation: 'Minimum is 0.' },
    ],
    approach: [
      'Compare nums[mid] with nums[hi] to learn which half holds the rotation point.',
      'If nums[mid] > nums[hi] the minimum is to the right; otherwise it is at mid or left.',
    ],
    solution: `def find_min(nums: list[int]) -> int:
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] > nums[hi]:
            lo = mid + 1
        else:
            hi = mid
    return nums[lo]`,
    complexity: { time: 'O(log n)', space: 'O(1)' },
  },
  {
    slug: 'search-a-2d-matrix',
    title: 'Search a 2D Matrix',
    difficulty: 'Medium',
    pattern: 'Binary Search',
    leetcode: 74,
    statement:
      'Given an m x n matrix where each row is sorted left-to-right and the first value of each row is greater than the last value of the previous row, return True if target is present. Must run in O(log(m*n)).',
    examples: [
      { input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3', output: 'True', explanation: '3 is in row 0.' },
      { input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13', output: 'False', explanation: '13 is absent.' },
    ],
    approach: [
      'Treat the matrix as one flattened sorted array of length m*n.',
      'Map a 1D index to 2D with divmod by the number of columns and binary search.',
    ],
    solution: `def search_matrix(matrix: list[list[int]], target: int) -> bool:
    rows, cols = len(matrix), len(matrix[0])
    lo, hi = 0, rows * cols - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        value = matrix[mid // cols][mid % cols]
        if value == target:
            return True
        if value < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return False`,
    complexity: { time: 'O(log(m*n))', space: 'O(1)' },
  },
  {
    slug: 'koko-eating-bananas',
    title: 'Koko Eating Bananas',
    difficulty: 'Medium',
    pattern: 'Binary Search on Answer',
    leetcode: 875,
    statement:
      'Koko has piles of bananas and h hours. Each hour she eats up to k bananas from one pile. Return the minimum integer k so she can finish all piles within h hours.',
    examples: [
      { input: 'piles = [3,6,7,11], h = 8', output: '4', explanation: 'Speed 4 finishes in time.' },
      { input: 'piles = [30,11,23,4,20], h = 5', output: '30', explanation: 'She must eat fast.' },
    ],
    approach: [
      'The answer lies between 1 and max(piles); the feasibility is monotonic.',
      'Binary search the speed; for a candidate k compute total hours with ceiling division.',
    ],
    solution: `import math

def min_eating_speed(piles: list[int], h: int) -> int:
    lo, hi = 1, max(piles)
    while lo < hi:
        mid = (lo + hi) // 2
        hours = sum(math.ceil(pile / mid) for pile in piles)
        if hours <= h:
            hi = mid
        else:
            lo = mid + 1
    return lo`,
    complexity: { time: 'O(n log max)', space: 'O(1)' },
  },
  {
    slug: 'minimum-size-subarray-sum',
    title: 'Minimum Size Subarray Sum',
    difficulty: 'Medium',
    pattern: 'Sliding Window',
    leetcode: 209,
    statement:
      'Given an array of positive integers nums and a target, return the minimal length of a contiguous subarray whose sum is >= target, or 0 if none exists.',
    examples: [
      { input: 'target = 7, nums = [2,3,1,2,4,3]', output: '2', explanation: 'Subarray [4,3].' },
      { input: 'target = 11, nums = [1,1,1,1,1,1,1,1]', output: '0', explanation: 'No subarray reaches 11.' },
    ],
    approach: [
      'Expand a window with the right pointer, accumulating the sum.',
      'While the sum meets the target, record the length and shrink from the left.',
    ],
    solution: `def min_subarray_len(target: int, nums: list[int]) -> int:
    left = 0
    total = 0
    best = float('inf')
    for right, num in enumerate(nums):
        total += num
        while total >= target:
            best = min(best, right - left + 1)
            total -= nums[left]
            left += 1
    return best if best != float('inf') else 0`,
    complexity: { time: 'O(n)', space: 'O(1)' },
  },
  {
    slug: 'sliding-window-maximum',
    title: 'Sliding Window Maximum',
    difficulty: 'Hard',
    pattern: 'Monotonic Deque',
    leetcode: 239,
    statement:
      'Given an array nums and a window size k, return the maximum of each contiguous window as it slides from left to right.',
    examples: [
      { input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', output: '[3,3,5,5,6,7]', explanation: 'Max of each window.' },
      { input: 'nums = [1], k = 1', output: '[1]', explanation: 'Single element.' },
    ],
    approach: [
      'Keep a deque of indices whose values are in decreasing order.',
      'Pop smaller values from the back, drop indices that fall outside the window from the front; the front is always the max.',
    ],
    solution: `from collections import deque

def max_sliding_window(nums: list[int], k: int) -> list[int]:
    dq = deque()  # indices, values decreasing
    res = []
    for i, num in enumerate(nums):
        while dq and nums[dq[-1]] < num:
            dq.pop()
        dq.append(i)
        if dq[0] == i - k:
            dq.popleft()
        if i >= k - 1:
            res.append(nums[dq[0]])
    return res`,
    complexity: { time: 'O(n)', space: 'O(k)' },
  },
  {
    slug: 'gas-station',
    title: 'Gas Station',
    difficulty: 'Medium',
    pattern: 'Greedy',
    leetcode: 134,
    statement:
      'There are n gas stations in a circle. gas[i] is the fuel available and cost[i] is the fuel needed to reach the next station. Return the starting index to complete the circuit once, or -1 if impossible.',
    examples: [
      { input: 'gas = [1,2,3,4,5], cost = [3,4,5,1,2]', output: '3', explanation: 'Start at index 3.' },
      { input: 'gas = [2,3,4], cost = [3,4,3]', output: '-1', explanation: 'Cannot complete the loop.' },
    ],
    approach: [
      'If total gas < total cost the trip is impossible.',
      'Track a running tank; whenever it drops below zero, the start must be the next station.',
    ],
    solution: `def can_complete_circuit(gas: list[int], cost: list[int]) -> int:
    if sum(gas) < sum(cost):
        return -1
    start = 0
    tank = 0
    for i in range(len(gas)):
        tank += gas[i] - cost[i]
        if tank < 0:
            start = i + 1
            tank = 0
    return start`,
    complexity: { time: 'O(n)', space: 'O(1)' },
  },
  {
    slug: 'jump-game',
    title: 'Jump Game',
    difficulty: 'Medium',
    pattern: 'Greedy',
    leetcode: 55,
    statement:
      'Given an array nums where each element is your maximum jump length from that position, return True if you can reach the last index starting from index 0.',
    examples: [
      { input: 'nums = [2,3,1,1,4]', output: 'True', explanation: 'Jump 1 then 3 steps to the end.' },
      { input: 'nums = [3,2,1,0,4]', output: 'False', explanation: 'Stuck at index 3.' },
    ],
    approach: [
      'Track the farthest index reachable so far.',
      'If the current index ever exceeds that reach, the end is unreachable.',
    ],
    solution: `def can_jump(nums: list[int]) -> bool:
    reach = 0
    for i, num in enumerate(nums):
        if i > reach:
            return False
        reach = max(reach, i + num)
    return True`,
    complexity: { time: 'O(n)', space: 'O(1)' },
  },
  {
    slug: 'jump-game-ii',
    title: 'Jump Game II',
    difficulty: 'Medium',
    pattern: 'Greedy',
    leetcode: 45,
    statement:
      'Given an array nums where each element is the maximum jump length, return the minimum number of jumps to reach the last index. You can always reach the end.',
    examples: [
      { input: 'nums = [2,3,1,1,4]', output: '2', explanation: 'Jump to index 1, then to the end.' },
      { input: 'nums = [2,3,0,1,4]', output: '2', explanation: 'Two jumps suffice.' },
    ],
    approach: [
      'Greedily expand the current jump range; track the farthest reachable index.',
      'When you reach the end of the current range, take a jump and extend the range.',
    ],
    solution: `def jump(nums: list[int]) -> int:
    jumps = 0
    cur_end = 0
    farthest = 0
    for i in range(len(nums) - 1):
        farthest = max(farthest, i + nums[i])
        if i == cur_end:
            jumps += 1
            cur_end = farthest
    return jumps`,
    complexity: { time: 'O(n)', space: 'O(1)' },
  },
  {
    slug: 'next-permutation',
    title: 'Next Permutation',
    difficulty: 'Medium',
    pattern: 'Array Manipulation',
    leetcode: 31,
    statement:
      'Rearrange nums into the lexicographically next greater permutation in place. If no greater permutation exists, rearrange to the lowest order (sorted ascending).',
    examples: [
      { input: 'nums = [1,2,3]', output: '[1,3,2]', explanation: 'Next permutation.' },
      { input: 'nums = [3,2,1]', output: '[1,2,3]', explanation: 'Wraps to the smallest.' },
    ],
    approach: [
      'Scan from the right to find the first index i where nums[i] < nums[i+1] (the pivot).',
      'Swap the pivot with the next larger value to its right, then reverse the suffix.',
    ],
    solution: `def next_permutation(nums: list[int]) -> None:
    i = len(nums) - 2
    while i >= 0 and nums[i] >= nums[i + 1]:
        i -= 1
    if i >= 0:
        j = len(nums) - 1
        while nums[j] <= nums[i]:
            j -= 1
        nums[i], nums[j] = nums[j], nums[i]
    nums[i + 1:] = reversed(nums[i + 1:])`,
    complexity: { time: 'O(n)', space: 'O(1)' },
  },
  {
    slug: 'pascals-triangle',
    title: "Pascal's Triangle",
    difficulty: 'Easy',
    pattern: 'Simulation',
    leetcode: 118,
    statement:
      'Given an integer num_rows, return the first num_rows of the Pascal triangle, where each number is the sum of the two directly above it.',
    examples: [
      { input: 'num_rows = 5', output: '[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]', explanation: 'Five rows.' },
      { input: 'num_rows = 1', output: '[[1]]', explanation: 'Single row.' },
    ],
    approach: [
      'Each row starts and ends with 1.',
      'Interior values are the sum of the two values above them from the previous row.',
    ],
    solution: `def generate(num_rows: int) -> list[list[int]]:
    triangle = []
    for r in range(num_rows):
        row = [1] * (r + 1)
        for c in range(1, r):
            row[c] = triangle[r - 1][c - 1] + triangle[r - 1][c]
        triangle.append(row)
    return triangle`,
    complexity: { time: 'O(n^2)', space: 'O(1)' },
  },
  {
    slug: 'first-missing-positive',
    title: 'First Missing Positive',
    difficulty: 'Hard',
    pattern: 'Cyclic Sort',
    leetcode: 41,
    statement:
      'Given an unsorted integer array nums, return the smallest missing positive integer. Must run in O(n) time and use O(1) extra space.',
    examples: [
      { input: 'nums = [1,2,0]', output: '3', explanation: '1 and 2 present, 3 missing.' },
      { input: 'nums = [3,4,-1,1]', output: '2', explanation: '2 is the smallest missing positive.' },
    ],
    approach: [
      'Place each value v in the range [1..n] at index v-1 by swapping (cyclic sort).',
      'The first index i whose value is not i+1 reveals the missing positive.',
    ],
    solution: `def first_missing_positive(nums: list[int]) -> int:
    n = len(nums)
    for i in range(n):
        while 1 <= nums[i] <= n and nums[nums[i] - 1] != nums[i]:
            target = nums[i] - 1
            nums[i], nums[target] = nums[target], nums[i]
    for i in range(n):
        if nums[i] != i + 1:
            return i + 1
    return n + 1`,
    complexity: { time: 'O(n)', space: 'O(1)' },
  },
  {
    slug: 'median-of-two-sorted-arrays',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    pattern: 'Binary Search',
    leetcode: 4,
    statement:
      'Given two sorted arrays nums1 and nums2, return the median of the combined sorted array. The overall run time must be O(log(m+n)).',
    examples: [
      { input: 'nums1 = [1,3], nums2 = [2]', output: '2.0', explanation: 'Merged [1,2,3], median 2.' },
      { input: 'nums1 = [1,2], nums2 = [3,4]', output: '2.5', explanation: 'Merged median (2+3)/2.' },
    ],
    approach: [
      'Binary search a partition of the smaller array so left halves of both arrays have the correct size.',
      'A valid partition has left1 <= right2 and left2 <= right1; then derive the median from the boundary values.',
    ],
    solution: `def find_median_sorted_arrays(nums1: list[int], nums2: list[int]) -> float:
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1
    m, n = len(nums1), len(nums2)
    half = (m + n + 1) // 2
    lo, hi = 0, m
    while lo <= hi:
        i = (lo + hi) // 2
        j = half - i
        left1 = nums1[i - 1] if i > 0 else float('-inf')
        right1 = nums1[i] if i < m else float('inf')
        left2 = nums2[j - 1] if j > 0 else float('-inf')
        right2 = nums2[j] if j < n else float('inf')
        if left1 <= right2 and left2 <= right1:
            if (m + n) % 2:
                return float(max(left1, left2))
            return (max(left1, left2) + min(right1, right2)) / 2
        if left1 > right2:
            hi = i - 1
        else:
            lo = i + 1
    return 0.0`,
    complexity: { time: 'O(log(min(m,n)))', space: 'O(1)' },
  },
]
