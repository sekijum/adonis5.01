package example.domain.model.core

/**
 * [DomainEvent]の購読インターフェース。
 */
interface DomainEventSubscriber<T : DomainEvent<*>> {

    /**
     * ドメインイベントを購読しハンドリングする。
     *
     * @param domainEvent ドメインイベント
     */
    fun handleEvent(domainEvent: T)
}
