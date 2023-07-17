package example.adapter.gateway.messaging

import example.domain.model.account.AccountEvent
import example.domain.model.core.DomainEventPublisher
import org.springframework.context.ApplicationEventPublisher
import org.springframework.stereotype.Component

@Component
class AccountEventSpringPublisher(
    private val eventPublisher: ApplicationEventPublisher
) : DomainEventPublisher<AccountEvent<*>> {

    override fun publish(domainEvent: AccountEvent<*>) {
        eventPublisher.publishEvent(domainEvent)
    }
}
