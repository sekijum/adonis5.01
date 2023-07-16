package example.domain.model.core

/**
 * 何らかのドメインを識別するIDを表現した値オブジェクトの概念。
 */
interface Identity<T : Identity<T>> : ValueObject<T> {

    fun id(): String
}
