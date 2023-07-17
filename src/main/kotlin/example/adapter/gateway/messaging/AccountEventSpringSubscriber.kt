package example.adapter.gateway.messaging

import example.domain.model.account.AccountEvent
import example.domain.model.core.DomainEventSubscriber
import org.springframework.context.event.EventListener
import org.springframework.stereotype.Component

@Component
class AccountEventSpringSubscriber : DomainEventSubscriber<AccountEvent<*>> {

    @EventListener
    override fun handleEvent(domainEvent: AccountEvent<*>) {
        println("type=${domainEvent.type}, account=${domainEvent.account}, occurredOn=${domainEvent.occurredOn}")
        // 何もしない。キューにエンキューする、メールを送る、REST APIを叩く、どっかに通知を送るなどが考えられる
    }
}
