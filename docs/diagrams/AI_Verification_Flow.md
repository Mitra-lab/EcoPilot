```mermaid
flowchart TD

    A[Challenge Completed]

    B[Evidence Submission]

    C{Evidence Type}

    D[Text Explanation]

    E[Photo Upload]

    F[Gemini Evaluation]

    G{Verification Result}

    H[Verified]

    I[Likely Verified]

    J[Needs More Evidence]

    K[Points Awarded]

    L[Dashboard Updated]

    A --> B

    B --> C

    C --> D
    C --> E

    D --> F
    E --> F

    F --> G

    G --> H
    G --> I
    G --> J

    H --> K
    I --> K

    K --> L
```
