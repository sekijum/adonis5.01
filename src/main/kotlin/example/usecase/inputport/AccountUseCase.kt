package example.usecase.inputport

import example.domain.model.account.Account
import example.usecase.inputport.command.account.*
import reactor.core.publisher.Mono

interface AccountUseCase {

    fun find(command: FindAccountCommand): Mono<Account>

    fun findAll(command: FindAllAccountCommand): Mono<Pair<Int, List<Account>>>

    fun create(command: CreateAccountCommand): Mono<Account>

    fun update(command: UpdateAccountCommand): Mono<Account>

    fun delete(command: DeleteAccountCommand): Mono<Account>
}
