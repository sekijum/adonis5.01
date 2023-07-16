package example.domain.model.core

/**
 * DDDにおけるエンティティの概念。
 */
interface Entity<T> {

    fun sameIdentityAs(other: T): Boolean
}
