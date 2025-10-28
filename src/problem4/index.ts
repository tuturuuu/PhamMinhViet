// Function A: Uses mathematical formula
function sum_to_n_a(n: number): number {
  // This uses a direct formula (n * (n + 1)) / 2
  // Time Complexity: O(1)
  // Space Complexity: O(1)
  return (n * (n + 1)) / 2;
}

// Function B: Uses an iterative loop
function sum_to_n_b(n: number): number {
  let sum = 0;
  // Time Complexity: O(n)
  // Space Complexity: O(1)
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

// Function C: Uses recursion
function sum_to_n_c(n: number): number {
  // Base case: when n = 1, return 1
  if (n === 1) {
    return 1;
  }
  // Time Complexity: O(n)
  // Space Complexity: O(n)
  //     - Due to recursion, n stack frames exist at the deepest point.
  return n + sum_to_n_c(n - 1);
}

console.log(sum_to_n_a(5));
console.log(sum_to_n_b(5));
console.log(sum_to_n_c(5)); // 55
