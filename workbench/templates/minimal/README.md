# Template: `minimal`

Clean editorial LinkedIn carousel, 1080×1350 portrait. Big typography, lots of whitespace, one accent color (brand default: `#5B8CFF`).

## Slide kinds

| kind      | required                  | optional                             | use for                              |
|-----------|---------------------------|--------------------------------------|--------------------------------------|
| `title`   | `title`                   | `eyebrow`, `subtitle`                | cover slide (always slide 0)         |
| `content` | `title`                   | `eyebrow`, `body`, `bullets`         | the bread-and-butter content slide   |
| `quote`   | `quote`                   | `attribution`                        | one punchy quote, max ~20 words      |
| `stat`    | `value`, `label`          | `context`                            | one big number + explanation         |
| `cta`     | `title`, `cta`            | `eyebrow`, `body`                    | closing slide, always last           |

## Copy rules

- `title` on cover: max ~9 words, no period.
- `content.title`: max ~10 words, must be a complete thought (statement, not a question).
- `content.body`: max ~30 words.
- `content.bullets`: 2–5 items, each max ~12 words, start with a verb or noun, no period.
- `quote.quote`: max ~20 words.
- `stat.value`: max 5 characters (e.g. `83%`, `10×`, `2.4s`, `1B`).
- `cta.cta`: max 4 words, action-oriented (e.g. `Follow for more`, `Get the playbook`).

## Structure

Always: cover (`title`) → 3–6 content/quote/stat → close (`cta`). LinkedIn allows up to 10 slides; 6–8 is the sweet spot.
