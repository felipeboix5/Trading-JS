# Trading Uruguay 📈🇺🇾

A web-based trading simulator (stock buy/sell, portfolio management, transaction history, and simulated quotes) built for Uruguayan investors just getting started with trading. The project's main focus is on **code quality, maintainability, and software engineering best practices**, rather than just feature delivery.

Developed for the **Software Engineering Fundamentals (FIS)** course — ORT Uruguay, as a team with Juan Pagliotti.

## Features

- **Stock buy/sell simulation**, with a mini-portfolio view visible in the same section.
- **Portfolio management**: total investment value, daily profit, and number of active investments.
- **Transaction history**: a record of every buy and sell movement made in the system.
- **Simulated quotes**: view of prices, names, and market trend for each available stock.

## Tech stack

- Vanilla JavaScript (ES Modules), HTML, and CSS
- Clean architecture split into `domain` (business logic) and `interface` (UI)
- **Jest** for unit testing, with code coverage
- **ESLint + Prettier** enforced for code quality and consistency

## Project structure

- `src/domain/`: business logic (portfolio, transactions, history) and its tests.
- `src/interface/`: user interface (HTML, CSS, JS) and assets.
- `docs/`: process documentation — research, design decisions, usability/accessibility (Nielsen heuristics, WCAG AAA), code quality, and testing.

## Documentation

| Report | Description |
| :--- | :--- |
| [`informe_1`](docs/informe_1.md) | Initial research, repo structure, and team workflow strategy. |
| [`informe_2`](docs/informe_2.md) | Implemented features, usability/accessibility, and code quality. |
| [`informe_testing`](docs/informe_testing.md) | Testing strategy and coverage. |

## How to run it

\`\`\`bash
npm install
npm test        # runs the tests with coverage
\`\`\`

To view the UI, open `src/interface/index.html` in your browser.

## Screenshots

Screenshots of the different sections are available in `src/interface/img/` and `docs/anexo/img/`.
