export interface TopicInfo {
  id: string;
  name: string;
  category: 'quant' | 'reasoning' | 'verbal' | 'coding';
  formulae: string[];
  tips: string[];
}

export const topicsData: TopicInfo[] = [
  {
    id: 'number-system',
    name: 'Number System',
    category: 'quant',
    formulae: [
      'Sum of first n natural numbers = n(n+1)/2',
      'Sum of first n odd numbers = n²',
      'Sum of first n even numbers = n(n+1)',
      'Dividend = (Divisor × Quotient) + Remainder',
      'Product of two numbers = HCF × LCM'
    ],
    tips: [
      'Unit digit cycle: 2(2,4,8,6), 3(3,9,7,1), 7(7,9,3,1), 8(8,4,2,6)',
      'Numbers ending in 0, 1, 5, 6 always have the same unit digit for any power.'
    ]
  },
  {
    id: 'percentages',
    name: 'Percentages',
    category: 'quant',
    formulae: [
      'Percentage = (Value / Total) × 100',
      'Percent Increase = (Increase / Original Value) × 100',
      'If A is x% more than B, then B is [x/(100+x)] × 100 % less than A',
      'Net Change = x + y + (xy/100) %'
    ],
    tips: [
      'Remember common fractions: 1/2=50%, 1/3=33.33%, 1/4=25%, 1/5=20%, 1/6=16.66%, 1/8=12.5%'
    ]
  },
  {
    id: 'profit-loss',
    name: 'Profit and Loss',
    category: 'quant',
    formulae: [
      'Profit = SP - CP',
      'Loss = CP - SP',
      'Profit % = (Profit / CP) × 100',
      'SP = [(100 + Gain%) / 100] × CP',
      'Discount = Marked Price - SP'
    ],
    tips: [
      'Profit or loss is always calculated on Cost Price (CP) unless stated otherwise.'
    ]
  },
  {
    id: 'time-work',
    name: 'Time and Work',
    category: 'quant',
    formulae: [
      'If A can do work in x days, 1 day work = 1/x',
      'If A does work in x days and B in y days, together they take (x*y)/(x+y) days',
      'M1*D1*H1 / W1 = M2*D2*H2 / W2 (Work Equivalence Formula)'
    ],
    tips: [
      'Efficiency is inversely proportional to time taken.',
      'Use LCM of time to assume total work units for easier calculation.'
    ]
  },
  {
    id: 'speed-distance',
    name: 'Speed, Time and Distance',
    category: 'quant',
    formulae: [
      'Speed = Distance / Time',
      '1 km/h = 5/18 m/s',
      '1 m/s = 18/5 km/h',
      'Average Speed = (2 * S1 * S2) / (S1 + S2) [for equal distances]'
    ],
    tips: [
      'Relative Speed: Same direction (S1-S2), Opposite direction (S1+S2).',
      'Train crossing a pole: Distance = Length of Train.'
    ]
  },
  {
    id: 'averages',
    name: 'Averages',
    category: 'quant',
    formulae: [
      'Average = Sum of Observations / Number of Observations',
      'Sum = Average × Number of Observations'
    ],
    tips: [
      'If every number is increased by k, the average also increases by k.'
    ]
  },
  {
    id: 'ratio-proportion',
    name: 'Ratio and Proportion',
    category: 'quant',
    formulae: [
      'If A:B = a:b and B:C = c:d, then A:B:C = (a*c) : (b*c) : (b*d)',
      'Mean Proportion of a and b = √(ab)'
    ],
    tips: [
      'A ratio remains unchanged if both terms are multiplied or divided by the same non-zero number.'
    ]
  },
  {
    id: 'pipes-cisterns',
    name: 'Pipes and Cisterns',
    category: 'quant',
    formulae: [
      'If a pipe fills a tank in x hours, work done in 1 hr = 1/x',
      'If an outlet pipe empties a tank in y hours, work done in 1 hr = -1/y',
      'Net work done by one filling and one outlet pipe in 1 hr = (1/x) - (1/y)'
    ],
    tips: [
      'Treat filling as positive work and leakage/emptying as negative work.'
    ]
  },
  {
    id: 'interest',
    name: 'Simple & Compound Interest',
    category: 'quant',
    formulae: [
      'SI = (P * R * T) / 100',
      'Amount (SI) = P + SI',
      'Amount (CI) = P(1 + R/100)^T',
      'CI = Amount - P',
      'Difference between CI and SI for 2 years = P(R/100)²',
      'Difference between CI and SI for 3 years = P(R/100)² * (3 + R/100)'
    ],
    tips: [
      'CI is interest on interest.',
      'If interest is compounded half-yearly, Rate becomes R/2 and Time becomes 2T.'
    ]
  },
  {
    id: 'probability',
    name: 'Probability',
    category: 'quant',
    formulae: [
      'P(E) = (Number of favorable outcomes) / (Total number of outcomes)',
      'P(E) + P(not E) = 1',
      'P(A ∪ B) = P(A) + P(B) - P(A ∩ B)'
    ],
    tips: [
      'Probability always lies between 0 and 1.',
      'Total outcomes for n coins = 2ⁿ; for n dice = 6ⁿ.'
    ]
  },
  {
    id: 'p-c',
    name: 'Permutations & Combinations',
    category: 'quant',
    formulae: [
      'nPn = n!',
      'nPr = n! / (n-r)!',
      'nCr = n! / [r!(n-r)!]',
      'nCr = nC(n-r)'
    ],
    tips: [
      'Use Permutations when order matters (Arrangements).',
      'Use Combinations when order doesn\'t matter (Selections).'
    ]
  },
  {
    id: 'mensuration',
    name: 'Mensuration (2D & 3D)',
    category: 'quant',
    formulae: [
      'Area Circle = πr²',
      'Circumference = 2πr',
      'Area Triangle = 1/2 * base * height',
      'Volume Cube = a³',
      'Volume Cylinder = πr²h',
      'Volume Sphere = 4/3 πr³',
      'TSA Cylinder = 2πr(r+h)'
    ],
    tips: [
      'Always check the units (cm, m, etc.) before calculating.'
    ]
  },
  {
    id: 'di',
    name: 'Data Interpretation',
    category: 'quant',
    formulae: [
      'Percentage Growth = [(New - Old) / Old] * 100',
      'Average = Total Sum / Number of Years/Items'
    ],
    tips: [
      'Read the graph labels and units carefully.',
      'Try to approximate values in calculation-heavy DI questions.'
    ]
  },
  {
    id: 'blood-relations',
    name: 'Blood Relations',
    category: 'reasoning',
    formulae: [
      'Male: represented by Square/Plus',
      'Female: represented by Circle/Minus',
      'Married Couple: represented by double horizontal line',
      'Siblings: represented by single horizontal line',
      'Next Generation: represented by vertical line'
    ],
    tips: [
      'Draw a family tree as you read the question.',
      'Do not assume gender from name (e.g., "Kiran" could be male or female).'
    ]
  },
  {
    id: 'coding-decoding',
    name: 'Coding-Decoding',
    category: 'reasoning',
    formulae: [
      'A=1, B=2, ..., Z=26',
      'EJOTY: E=5, J=10, O=15, T=20, Y=25',
      'Reverse: Z=1, Y=2, ..., A=26 (Sum of position + reverse position = 27)'
    ],
    tips: [
      'Check for shifts (+1, -2, etc.), reverse letters, or cross patterns.'
    ]
  },
  {
    id: 'number-series',
    name: 'Number Series',
    category: 'reasoning',
    formulae: [
      'Arithmetic Series: a, a+d, a+2d...',
      'Geometric Series: a, ar, ar²...',
      'Square/Cube Series: 1, 4, 9... or 1, 8, 27...',
      'Fibonacci: 1, 1, 2, 3, 5, 8...'
    ],
    tips: [
      'Find the difference between consecutive terms. If differences are constant, it\'s an AP.',
      'If differences are also in a pattern, it\'s a double-difference series.'
    ]
  },
  {
    id: 'english-grammar',
    name: 'English Grammar',
    category: 'verbal',
    formulae: [
      'Subject-Verb Agreement: Singular subject takes singular verb, plural takes plural.',
      'Tenses: Present (do/does), Past (did), Future (will/shall).',
      'Articles: A/An (indefinite), The (definite).',
      'Prepositions: In, On, At, Between, Among, etc.'
    ],
    tips: [
      'Always look for the main subject of the sentence to decide the verb form.',
      '"Each", "Every", "Everyone" are always followed by singular verbs.'
    ]
  },
  {
    id: 'sentence-completion',
    name: 'Sentence & Word Completion',
    category: 'verbal',
    formulae: [
      'Contextual Meaning: Identify the tone of the sentence (positive, negative, neutral).',
      'Conjunctions: Use "and", "moreover" for similar ideas; "but", "however" for contrasting ideas.'
    ],
    tips: [
      'Read the entire sentence before looking at the options.',
      'Eliminate options that are grammatically incorrect in the blank.'
    ]
  },
  {
    id: 'error-id',
    name: 'Error Identification',
    category: 'verbal',
    formulae: [
      'Noun-Pronoun Agreement',
      'Modifier Placement: Ensure adjectives/adverbs modify the correct word.',
      'Parallelism: Elements in a list should have the same grammatical form.'
    ],
    tips: [
      'Read the sentence naturally; often the error "sounds" wrong.',
      'Check for common errors like "it\'s" vs "its" or "their" vs "there".'
    ]
  },
  {
    id: 'arrangement',
    name: 'Sentence Arrangement (PQRS)',
    category: 'verbal',
    formulae: [
      'Opening Sentence: Usually introduces the subject (avoids starting with "He", "It", "But").',
      'Mandatory Pairs: Look for clues like "This", "That", or logical flow (Cause -> Effect).'
    ],
    tips: [
      'Identify the concluding sentence (summarizes or gives a result).',
      'Use options to narrow down the possible starting sentences.'
    ]
  },
  {
    id: 'meanings',
    name: 'Meanings (Synonyms & Antonyms)',
    category: 'verbal',
    formulae: [
      'Prefixes/Suffixes: "un-", "in-", "dis-" usually mean "not".',
      'Root Words: "bene" (good), "mal" (bad), "chron" (time).'
    ],
    tips: [
      'Use the word in a simple sentence if you\'re unsure of its meaning.',
      'Positive words usually have positive synonyms; negative have negative.'
    ]
  },
  {
    id: 'reading-comp',
    name: 'Reading Comprehension',
    category: 'verbal',
    formulae: [
      'Skimming: Quickly read for the main idea.',
      'Scanning: Look for specific keywords or data.'
    ],
    tips: [
      'Read the questions first, then the passage.',
      'Avoid using outside knowledge; answer strictly based on the passage.'
    ]
  }
];
