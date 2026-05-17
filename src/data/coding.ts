import { CodingProblem } from '../types';

export const codingProblems: CodingProblem[] = [
  {
    id: 1,
    title: "Chocolate Factory (Move Zeroes)",
    problemStatement: "A chocolate factory is packing chocolates into the packets. The chocolate packets here represent an array of N number of integer values. The task is to find the empty packets(0) of chocolate and push it to the end of the conveyor belt(array).",
    example: "Input: 8, [4,5,0,1,9,0,5,0]\nOutput: 4 5 1 9 5 0 0 0",
    solution: {
      c: `#include<stdio.h>\nint main() {\n    int n;\n    scanf("%d", &n);\n    int L[n];\n    int j = 0;\n    for (int i = 0; i < n; i++) {\n        int a;\n        scanf("%d", &a);\n        if (a != 0) {\n            L[j] = a;\n            j++;\n        }\n    }\n    for (int i = 0; i < n; i++) {\n        if (i < j) printf("%d ", L[i]);\n        else printf("0 ");\n    }\n    return 0;\n}`,
      python: `n = int(input())\narr = [int(input()) for _ in range(n)]\nresult = [x for x in arr if x != 0]\nresult += [0] * (n - len(result))\nprint(*result)`
    },
    explanation: "Keep track of a pointer 'j' for non-zero elements. After placing all non-zero elements, fill the rest of the array with zeroes."
  },
  {
    id: 2,
    title: "Binary Bit Toggling",
    problemStatement: "Convert a decimal value to binary representation. Toggle all bits of it after the most significant bit including the most significant bit. Print the positive integer value after toggling all bits.",
    example: "Input: 10 (1010 in binary)\nOutput: 5 (0101 in binary)",
    constraints: "1 <= N <= 100",
    solution: {
      c: `#include<stdio.h> \n#include<math.h>\nint main()\n{\n    int n;\n    scanf("%d", &n);\n    int k = (1 << (int)(log2(n) + 1)) - 1;\n    printf("%d", n ^ k);\n    return 0;\n}`,
      python: `import math\nn = int(input())\nif n == 0:\n    print(1)\nelse:\n    k = (1 << (int(math.log2(n)) + 1)) - 1\n    print(n ^ k)`
    },
    explanation: "To toggle all bits, XOR the number with a bitmask of all 1s of the same length. The length can be found using log2(n) + 1."
  },
  {
    id: 3,
    title: "Sunday Count",
    problemStatement: "Count the number of Sundays within N days, given the starting day of the month.",
    example: "Input: mon, 13\nOutput: 2",
    solution: {
      c: `#include<stdio.h>\n#include<string.h>\nint main() {\n    char s[10];\n    scanf("%s", s);\n    int a, ans = 0;\n    scanf("%d", &a);\n    char weeks[][4] = {"mon", "tue", "wed", "thu", "fri", "sat", "sun"};\n    int values[] = {6, 5, 4, 3, 2, 1, 0};\n    int m = -1;\n    for (int i = 0; i < 7; i++) {\n        if (strcmp(s, weeks[i]) == 0) { m = values[i]; break; }\n    }\n    if (a - m >= 1) ans = 1 + (a - m) / 7;\n    printf("%d", ans);\n    return 0;\n}`,
      python: `day = input().lower()[:3]\nn = int(input())\nweeks = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]\nvalues = [6, 5, 4, 3, 2, 1, 0]\nm = values[weeks.index(day)]\nprint(1 + (n - m - 1) // 7 if n > m else 0)`
    },
    explanation: "Map each day to how many days until the first Sunday. Then subtract that from N and divide by 7."
  },
  {
    id: 4,
    title: "Airport Security Risk Sort (0,1,2)",
    problemStatement: "Sort an array of N items with risk levels 0, 1, and 2.",
    example: "Input: [1,0,2,0,1,0,2]\nOutput: 0 0 0 1 1 2 2",
    solution: {
      c: `#include<stdio.h> \nvoid sortArray(int arr[], int n) {\n    int low = 0, mid = 0, high = n - 1;\n    while (mid <= high) {\n        if (arr[mid] == 0) {\n            int temp = arr[low]; arr[low] = arr[mid]; arr[mid] = temp;\n            low++; mid++;\n        } else if (arr[mid] == 1) mid++;\n        else {\n            int temp = arr[mid]; arr[mid] = arr[high]; arr[high] = temp;\n            high--;\n        }\n    }\n}`,
      python: `n = int(input())\narr = [int(input()) for _ in range(n)]\narr.sort()\nprint(*arr)`
    },
    explanation: "This is the Dutch National Flag algorithm. Use three pointers (low, mid, high) to sort the array in a single pass."
  },
  {
    id: 5,
    title: "Prior Elements Count",
    problemStatement: "Count elements whose value is greater than all its prior elements. The 1st element is always counted.",
    example: "Input: [7,4,8,2,9]\nOutput: 3 (7, 8, 9)",
    solution: {
      c: `#include<stdio.h>\n#include<limits.h>\nint main() {\n    int n, c = 0, a, m = INT_MIN;\n    scanf("%d", &n);\n    while (n--) {\n        scanf("%d", &a);\n        if (a > m) {\n            m = a; c++;\n        }\n    }\n    printf("%d", c);\n    return 0;\n}`,
      python: `n = int(input())\narr = [int(input()) for _ in range(n)]\ncount = 0\nmax_val = -float('inf')\nfor x in arr:\n    if x > max_val:\n        max_val = x\n        count += 1\nprint(count)`
    },
    explanation: "Iterate through the array and maintain the maximum value seen so far. If the current element is greater than this maximum, increment the count."
  },
  {
    id: 6,
    title: "Product of Digits (Supermarket Pricing)",
    problemStatement: "Calculate the product of all digits of a given number N.",
    example: "Input: 5244\nOutput: 160 (5*2*4*4)",
    solution: {
      c: `#include<stdio.h>\n#include<string.h>\nint main() {\n    char s[100];\n    scanf("%s", s);\n    int p = 1;\n    for (int i = 0; i < strlen(s); i++) p *= (s[i] - '0');\n    printf("%d", p);\n    return 0;\n}`,
      python: `s = input()\np = 1\nfor char in s:\n    p *= int(char)\nprint(p)`
    },
    explanation: "Treat the number as a string or repeatedly use modulo (%) and division (/) to extract and multiply digits."
  },
  {
    id: 7,
    title: "Aqua Curtains (Max 'a' in Substring)",
    problemStatement: "Given a string of 'a' and 'b' and a length L, find the maximum number of 'a' in any substring of length L.",
    example: "Input: bbbaaababa, 3\nOutput: 3",
    solution: {
      c: `#include<stdio.h>\n#include<string.h>\nint main() {\n    char str[100];\n    scanf("%s", str);\n    int n, max = 0, count = 0;\n    scanf("%d", &n);\n    for (int i = 0; i < strlen(str); i++) {\n        if (i > 0 && i % n == 0) {\n            if (count > max) max = count;\n            count = 0;\n        }\n        if (str[i] == 'a') count++;\n    }\n    if (count > max) max = count;\n    printf("%d", max);\n    return 0;\n}`,
      python: `s = input()\nl = int(input())\nmax_a = 0\nfor i in range(0, len(s), l):\n    sub = s[i:i+l]\n    max_a = max(max_a, sub.count('a'))\nprint(max_a)`
    },
    explanation: "Divide the string into chunks of length L and count 'a' in each. The last chunk might be shorter if N is not divisible by L."
  },
  {
    id: 8,
    title: "Round Table Seating",
    problemStatement: "Number of ways to seat N members around a circular table such that two specific members always sit next to each other.",
    example: "Input: 4\nOutput: 12",
    solution: {
      c: `#include<stdio.h>\nint main() {\n    int n;\n    scanf("%d", &n);\n    long long fact = 1;\n    for (int i = 1; i < n - 1; i++) fact *= i;\n    printf("%lld", fact * 2);\n    return 0;\n}`,
      python: `import math\nn = int(input())\n# (n-2)! * 2\nprint(math.factorial(n-2) * 2)`
    },
    explanation: "Treat the 2 members as one unit. Now there are (N-1) units to arrange in a circle, which is (N-1-1)! = (N-2)! ways. The 2 members can swap in 2! ways. Total = (N-2)! * 2."
  },
  {
    id: 9,
    title: "Single Digit Sum (Decipher Threat)",
    problemStatement: "Sum the digits of N, repeat this R times, and then find the single-digit sum of the result.",
    example: "Input: 99, 3\nOutput: 9",
    solution: {
      c: `#include<stdio.h>\n#include<string.h>\nint main() {\n    char s[100]; long long sum = 0; int r;\n    scanf("%s %d", s, &r);\n    if (r == 0) { printf("0"); return 0; }\n    for (int i = 0; i < strlen(s); i++) sum += (s[i] - '0');\n    sum *= r;\n    while (sum > 9) {\n        long long temp = 0;\n        while (sum) { temp += sum % 10; sum /= 10; }\n        sum = temp;\n    }\n    printf("%lld", sum);\n    return 0;\n}`,
      python: `n = input()\nr = int(input())\nif r == 0:\n    print(0)\nelse:\n    total = sum(int(i) for i in n) * r\n    while total >= 10:\n        total = sum(int(i) for i in str(total))\n    print(total)`
    },
    explanation: "Multiply the sum of digits of N by R, then repeatedly sum the digits of the result until a single digit is obtained."
  },
  {
    id: 10,
    title: "Traffic Fine (Odd/Even Concept)",
    problemStatement: "Calculate total fine collected on date D. Odd registration numbers on even dates and even numbers on odd dates are fined X amount.",
    example: "Input: [5,2,3,7], D=12, X=200\nOutput: 600",
    solution: {
      c: `#include<stdio.h>\nint main() {\n    int n, d, x, fine = 0;\n    scanf("%d", &n);\n    int a[n];\n    for(int i=0; i<n; i++) scanf("%d", &a[i]);\n    scanf("%d %d", &d, &x);\n    for(int i=0; i<n; i++) {\n        if (d % 2 == 0 && a[i] % 2 != 0) fine += x;\n        else if (d % 2 != 0 && a[i] % 2 == 0) fine += x;\n    }\n    printf("%d", fine);\n    return 0;\n}`,
      python: `n = int(input())\narr = [int(input()) for _ in range(n)]\nd = int(input())\nx = int(input())\nfine = 0\nfor reg in arr:\n    if d % 2 != reg % 2:\n        fine += x\nprint(fine)`
    },
    explanation: "Check if the parity (odd/even) of the date matches the parity of the registration number. If not, add the fine amount."
  },
  {
    id: 11,
    title: "Reverse a Number",
    problemStatement: "Given an integer N, reverse its digits and print the result. Leading zeroes should be dropped.",
    example: "Input: 12345\nOutput: 54321\n\nInput: 1200\nOutput: 21",
    constraints: "1 <= N <= 10^9",
    solution: {
      c: `#include<stdio.h>\nint main() {\n    int n, rev = 0;\n    scanf("%d", &n);\n    while (n != 0) {\n        rev = rev * 10 + n % 10;\n        n /= 10;\n    }\n    printf("%d", rev);\n    return 0;\n}`,
      python: `n = input().strip()\nprint(int(n[::-1]))`
    },
    explanation: "Repeatedly extract the last digit using modulo 10, build the reversed number by multiplying by 10. In Python, slicing with [::-1] reverses the string, and int() drops leading zeros."
  },
  {
    id: 12,
    title: "Palindrome Check",
    problemStatement: "Given a string or number, determine if it reads the same forwards and backwards. Print 'YES' if palindrome, else 'NO'.",
    example: "Input: madam\nOutput: YES\n\nInput: 12321\nOutput: YES\n\nInput: hello\nOutput: NO",
    solution: {
      c: `#include<stdio.h>\n#include<string.h>\nint main() {\n    char s[100];\n    scanf("%s", s);\n    int n = strlen(s), flag = 1;\n    for (int i = 0; i < n / 2; i++) {\n        if (s[i] != s[n - 1 - i]) { flag = 0; break; }\n    }\n    printf("%s", flag ? "YES" : "NO");\n    return 0;\n}`,
      python: `s = input().strip()\nprint("YES" if s == s[::-1] else "NO")`
    },
    explanation: "Compare the string with its reverse. In C, use two pointers from both ends moving inward. In Python, s[::-1] gives the reverse — compare directly."
  },
  {
    id: 13,
    title: "Fibonacci Series (Nth Term)",
    problemStatement: "Print the Nth term of the Fibonacci sequence where F(1)=0, F(2)=1, F(N)=F(N-1)+F(N-2).",
    example: "Input: 7\nOutput: 8\n\nSequence: 0, 1, 1, 2, 3, 5, 8, ...",
    constraints: "1 <= N <= 30",
    solution: {
      c: `#include<stdio.h>\nint main() {\n    int n;\n    scanf("%d", &n);\n    long long a = 0, b = 1;\n    if (n == 1) { printf("0"); return 0; }\n    for (int i = 2; i < n; i++) {\n        long long c = a + b;\n        a = b; b = c;\n    }\n    printf("%lld", b);\n    return 0;\n}`,
      python: `n = int(input())\na, b = 0, 1\nfor _ in range(n - 1):\n    a, b = b, a + b\nprint(a)`
    },
    explanation: "Use two variables a and b to iteratively compute Fibonacci. Swap: a=b, b=a+b in each step. After (n-1) iterations, 'a' holds the Nth Fibonacci number."
  },
  {
    id: 14,
    title: "Armstrong Number",
    problemStatement: "Check if a given number N is an Armstrong number. A number is Armstrong if the sum of its digits each raised to the power of the number of digits equals the number itself.",
    example: "Input: 153\nOutput: YES (1^3 + 5^3 + 3^3 = 153)\n\nInput: 370\nOutput: YES\n\nInput: 100\nOutput: NO",
    solution: {
      c: `#include<stdio.h>\n#include<math.h>\nint main() {\n    int n, original, sum = 0, digits = 0;\n    scanf("%d", &n);\n    original = n;\n    int temp = n;\n    while (temp) { digits++; temp /= 10; }\n    temp = n;\n    while (temp) {\n        int d = temp % 10;\n        sum += (int)pow(d, digits);\n        temp /= 10;\n    }\n    printf("%s", sum == original ? "YES" : "NO");\n    return 0;\n}`,
      python: `n = input().strip()\ndigits = len(n)\nprint("YES" if sum(int(d)**digits for d in n) == int(n) else "NO")`
    },
    explanation: "Count the number of digits (say k). Then sum each digit raised to the power k. If the sum equals the original number, it's an Armstrong number. Classic TCS question!"
  },
  {
    id: 15,
    title: "Count Vowels and Consonants",
    problemStatement: "Given a string, count the number of vowels (a,e,i,o,u) and consonants separately.",
    example: "Input: Hello World\nOutput: Vowels: 3, Consonants: 7",
    solution: {
      c: `#include<stdio.h>\n#include<string.h>\n#include<ctype.h>\nint main() {\n    char s[200];\n    fgets(s, sizeof(s), stdin);\n    int v = 0, c = 0;\n    for (int i = 0; s[i]; i++) {\n        char ch = tolower(s[i]);\n        if (ch >= 'a' && ch <= 'z') {\n            if (ch=='a'||ch=='e'||ch=='i'||ch=='o'||ch=='u') v++;\n            else c++;\n        }\n    }\n    printf("Vowels: %d, Consonants: %d", v, c);\n    return 0;\n}`,
      python: `s = input().lower()\nvowels = sum(1 for c in s if c in 'aeiou')\nconsonants = sum(1 for c in s if c.isalpha() and c not in 'aeiou')\nprint(f"Vowels: {vowels}, Consonants: {consonants}")`
    },
    explanation: "Iterate through each character. Convert to lowercase. If it's an alphabet, check if it's in 'aeiou' — if yes, it's a vowel; otherwise a consonant. Skip spaces and special characters."
  },
  {
    id: 16,
    title: "Second Largest Element",
    problemStatement: "Find the second largest element in an array of N integers without sorting.",
    example: "Input: [12, 35, 1, 10, 34, 1]\nOutput: 34",
    constraints: "2 <= N <= 10^5",
    solution: {
      c: `#include<stdio.h>\n#include<limits.h>\nint main() {\n    int n;\n    scanf("%d", &n);\n    int first = INT_MIN, second = INT_MIN;\n    for (int i = 0; i < n; i++) {\n        int x;\n        scanf("%d", &x);\n        if (x > first) { second = first; first = x; }\n        else if (x > second && x != first) second = x;\n    }\n    printf("%d", second);\n    return 0;\n}`,
      python: `n = int(input())\narr = [int(input()) for _ in range(n)]\nfirst = second = float('-inf')\nfor x in arr:\n    if x > first:\n        second = first\n        first = x\n    elif x > second and x != first:\n        second = x\nprint(second)`
    },
    explanation: "Maintain two variables: first (largest) and second (second largest). On each element, update first if it's bigger; else update second if it's bigger than second and not equal to first."
  },
  {
    id: 17,
    title: "Prime Number Check",
    problemStatement: "Given a number N, check whether it is prime or not. A prime number has exactly two factors: 1 and itself.",
    example: "Input: 29\nOutput: Prime\n\nInput: 15\nOutput: Not Prime",
    constraints: "2 <= N <= 10^6",
    solution: {
      c: `#include<stdio.h>\n#include<math.h>\nint main() {\n    int n;\n    scanf("%d", &n);\n    if (n < 2) { printf("Not Prime"); return 0; }\n    for (int i = 2; i <= (int)sqrt(n); i++) {\n        if (n % i == 0) { printf("Not Prime"); return 0; }\n    }\n    printf("Prime");\n    return 0;\n}`,
      python: `import math\nn = int(input())\nif n < 2:\n    print("Not Prime")\nelse:\n    prime = all(n % i != 0 for i in range(2, int(math.sqrt(n)) + 1))\n    print("Prime" if prime else "Not Prime")`
    },
    explanation: "Check divisibility from 2 up to √N only. If any number divides N evenly, it's not prime. Checking up to √N is sufficient because factors come in pairs — if one factor > √N, the other must be < √N."
  },
  {
    id: 18,
    title: "Anagram Check",
    problemStatement: "Given two strings, check if they are anagrams of each other (same characters, different order). Print 'ANAGRAM' or 'NOT ANAGRAM'.",
    example: "Input: listen\n       silent\nOutput: ANAGRAM\n\nInput: hello\n       world\nOutput: NOT ANAGRAM",
    solution: {
      c: `#include<stdio.h>\n#include<string.h>\nint main() {\n    char a[100], b[100];\n    int freq[256] = {0};\n    scanf("%s %s", a, b);\n    if (strlen(a) != strlen(b)) { printf("NOT ANAGRAM"); return 0; }\n    for (int i = 0; a[i]; i++) freq[(int)a[i]]++;\n    for (int i = 0; b[i]; i++) freq[(int)b[i]]--;\n    for (int i = 0; i < 256; i++) {\n        if (freq[i] != 0) { printf("NOT ANAGRAM"); return 0; }\n    }\n    printf("ANAGRAM");\n    return 0;\n}`,
      python: `a = input().strip().lower()\nb = input().strip().lower()\nprint("ANAGRAM" if sorted(a) == sorted(b) else "NOT ANAGRAM")`
    },
    explanation: "Two strings are anagrams if their sorted characters are identical. In C, use a frequency array — increment for string A, decrement for string B. If all counts are 0, they're anagrams."
  },
  {
    id: 19,
    title: "Swap Without Temp Variable",
    problemStatement: "Swap two numbers A and B without using a third (temporary) variable. Print swapped values.",
    example: "Input: A=5, B=10\nOutput: A=10, B=5",
    solution: {
      c: `#include<stdio.h>\nint main() {\n    int a, b;\n    scanf("%d %d", &a, &b);\n    a = a + b;\n    b = a - b;\n    a = a - b;\n    printf("A=%d, B=%d", a, b);\n    return 0;\n}`,
      python: `a, b = map(int, input().split())\na, b = b, a\nprint(f"A={a}, B={b}")`
    },
    explanation: "Use arithmetic: a=a+b stores sum; then b=a-b gives original a; then a=a-b gives original b. Alternatively, XOR swap: a^=b; b^=a; a^=b. Python elegantly does it in one line with tuple unpacking."
  },
  {
    id: 20,
    title: "Largest of Three Numbers",
    problemStatement: "Given three integers A, B, and C, find and print the largest among them without using built-in max().",
    example: "Input: 10 25 17\nOutput: 25",
    solution: {
      c: `#include<stdio.h>\nint main() {\n    int a, b, c;\n    scanf("%d %d %d", &a, &b, &c);\n    int max = a;\n    if (b > max) max = b;\n    if (c > max) max = c;\n    printf("%d", max);\n    return 0;\n}`,
      python: `a, b, c = map(int, input().split())\nmaximum = a\nif b > maximum:\n    maximum = b\nif c > maximum:\n    maximum = c\nprint(maximum)`
    },
    explanation: "Start by assuming 'a' is the largest. Then compare with b and c one at a time, updating the maximum if a larger value is found. Simple two-comparison approach — no sorting needed."
  },
  {
    id: 21,
    title: "Sum of Digits Until Single Digit",
    problemStatement: "Given a number N, repeatedly sum its digits until only a single digit remains. This is called the digital root.",
    example: "Input: 9875\nOutput: 2\n(9+8+7+5=29 → 2+9=11 → 1+1=2)",
    constraints: "1 <= N <= 10^18",
    solution: {
      c: `#include<stdio.h>\nint main() {\n    long long n;\n    scanf("%lld", &n);\n    if (n == 0) { printf("0"); return 0; }\n    long long result = n % 9;\n    printf("%lld", result == 0 ? 9 : result);\n    return 0;\n}`,
      python: `n = int(input())\nif n == 0:\n    print(0)\nelse:\n    result = n % 9\n    print(9 if result == 0 else result)`
    },
    explanation: "The digital root has a mathematical shortcut: it equals n % 9, with the special case that if the result is 0 (and n≠0), the answer is 9. This avoids loops entirely — a favourite TCS trick!"
  },
  {
    id: 22,
    title: "Pattern Printing (Right Triangle)",
    problemStatement: "Print a right-angled triangle star pattern of N rows.",
    example: "Input: 5\nOutput:\n*\n* *\n* * *\n* * * *\n* * * * *",
    solution: {
      c: `#include<stdio.h>\nint main() {\n    int n;\n    scanf("%d", &n);\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= i; j++) {\n            printf("* ");\n        }\n        printf("\\n");\n    }\n    return 0;\n}`,
      python: `n = int(input())\nfor i in range(1, n + 1):\n    print('* ' * i)`
    },
    explanation: "Outer loop controls rows (1 to N). Inner loop prints '*' exactly i times for row i. This gives a right triangle. Remember: each row i has i stars. Very common TCS pattern question!"
  },
  {
    id: 23,
    title: "GCD and LCM",
    problemStatement: "Find the Greatest Common Divisor (GCD) and Least Common Multiple (LCM) of two numbers A and B.",
    example: "Input: 12 18\nOutput: GCD=6, LCM=36",
    solution: {
      c: `#include<stdio.h>\nint gcd(int a, int b) {\n    return b == 0 ? a : gcd(b, a % b);\n}\nint main() {\n    int a, b;\n    scanf("%d %d", &a, &b);\n    int g = gcd(a, b);\n    printf("GCD=%d, LCM=%d", g, (a / g) * b);\n    return 0;\n}`,
      python: `import math\na, b = map(int, input().split())\ng = math.gcd(a, b)\nprint(f"GCD={g}, LCM={a * b // g}")`
    },
    explanation: "Use the Euclidean algorithm: gcd(a,b) = gcd(b, a%b), base case gcd(a,0)=a. LCM = (a*b)/GCD. Important: compute (a/GCD)*b to avoid integer overflow in C."
  },
  {
    id: 24,
    title: "Reverse Words in a Sentence",
    problemStatement: "Reverse the order of words in a given sentence. Words are separated by spaces.",
    example: "Input: Hello World TCS\nOutput: TCS World Hello",
    solution: {
      c: `#include<stdio.h>\n#include<string.h>\nint main() {\n    char s[500], words[50][100];\n    int count = 0;\n    fgets(s, sizeof(s), stdin);\n    char *token = strtok(s, " \\n");\n    while (token) {\n        strcpy(words[count++], token);\n        token = strtok(NULL, " \\n");\n    }\n    for (int i = count - 1; i >= 0; i--) {\n        printf("%s", words[i]);\n        if (i > 0) printf(" ");\n    }\n    return 0;\n}`,
      python: `sentence = input().strip()\nwords = sentence.split()\nprint(' '.join(reversed(words)))`
    },
    explanation: "Split the sentence into an array of words, then print them in reverse order. In Python, reversed() gives an iterator in reverse, and join() reassembles them with spaces."
  },
  {
    id: 25,
    title: "Missing Number in Array",
    problemStatement: "Given an array of N-1 integers in range [1, N], find the one missing number.",
    example: "Input: N=5, Array=[1,2,4,5]\nOutput: 3",
    constraints: "1 <= N <= 10^5",
    solution: {
      c: `#include<stdio.h>\nint main() {\n    int n;\n    scanf("%d", &n);\n    long long expected = (long long)n * (n + 1) / 2;\n    long long actual = 0;\n    for (int i = 0; i < n - 1; i++) {\n        int x; scanf("%d", &x);\n        actual += x;\n    }\n    printf("%lld", expected - actual);\n    return 0;\n}`,
      python: `n = int(input())\narr = [int(input()) for _ in range(n - 1)]\nprint(n * (n + 1) // 2 - sum(arr))`
    },
    explanation: "The sum of 1 to N is N*(N+1)/2. Subtract the actual sum of the array from this expected sum — the difference is the missing number. O(n) time, O(1) space. A classic TCS favourite!"
  }
];
