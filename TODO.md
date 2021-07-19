- fix `beta_reduction_step`

  - beta_reduction_step 的第二个分支要判断 target 是否已经是 normal form，
    如果是，就 reduce arg，否则就不 reduce arg，
    以保持「每个 step 最多只消除一个 reduction target」这个不变量。

- `Exp.normalize` by `beta_reduction_step` and `normal_form_p` and a while loop

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
