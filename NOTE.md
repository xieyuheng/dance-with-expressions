# equivalent theory of lambda calculus

alpha
beta
eta

First Church-Rosser theorem

- if normal form exists, normal form is unique.

Second Church-Rosser theorem

- leftmost redex reduction strategy is a normalizing strategy.

Böhm theorem

- if A, B have distinct beta eta normal forms,
  then there is a context C[] that will separate them.
  C[A] => K
  C[B] => K(I)

The above means, alpha beta eta conversion
is the strongest possible equational theory on normalizing lambda terms.

# normalization property

a rewrite system has the (strong) normalization property or is terminating if every term is strongly normalizing;
that is, if every sequence of rewrites eventually terminates with an irreducible term, also called a normal form.

A rewrite system may also have the weak normalization property,
meaning that for every term, there exists at least one particular sequence of rewrites that eventually yields a normal form, i.e., an irreducible term.

The pure untyped lambda calculus does not satisfy the strong normalization property, and not even the weak normalization property.

# invariants

表达式之舞

处理表达式的函数
要保持一个不变量
这个不变量可以总结为
自由变元是神圣的

# exp, just exp

也许实现类型检查器的时候，
不应该用 closure，
而应该用简单的 exp。

这样不会有 value 与 exp 分离所导致的很多难点。

closure 本质上是 lambda calculus 的特殊实现方式，
或者可以理解为是 subst 的优化，
然而，在优化之前，我们应该先理解未优化的朴素实现，
如果已有的带有优化的代码难以理解，
也许我们正应该先解除优化，退一步，看看。
