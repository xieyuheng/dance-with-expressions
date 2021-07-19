- `Exp.normalized_p`

  - 有一些 variable 可能是全局变量，
    所以当看到一个 variable 的时候，要先判断它是不是全局变量，
    只有非全局变量才是 normalized_p，
    全局变量还可以被 step。

- `Exp.normalize` by `beta_reduction_step` and `normalized_p` and a while loop

- be able to `eta_reduction_step` exp

- `Exp.normalize` also handle `eta_reduction_step`

- example about this `eta_reduction_step`

- use lean to prove classic theorems about lambda calculus

# reading

- to mock a mocking bird
- diagonalization-and-self-reference
- curry haskell's book

# problem

- https://writings.stephenwolfram.com/2021/06/1920-2020-and-a-20000-prize-announcing-the-s-combinator-challenge/
- https://writings.stephenwolfram.com/2020/12/combinators-a-centennial-view/
