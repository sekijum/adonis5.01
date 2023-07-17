package example.adapter.controller

import example.adapter.controller.resource.account.AccountResponse
import example.adapter.controller.resource.account.AccountResponses
import example.usecase.inputport.command.account.*
import example.usecase.outputport.dto.AccountDTO
import org.springframework.stereotype.Component
import reactor.core.publisher.Mono
import example.usecase.inputport.AccountUseCase as InAccountUseCase
import example.usecase.outputport.AccountUseCase as OutAccountUseCase

@Component
class AccountController(
    private val accountUseCase: InAccountUseCase,
    private val accountPresenter: OutAccountUseCase
) {

    fun find(accountId: String): Mono<AccountResponse> {
        val command = FindAccountCommand(accountId)
        return accountUseCase.find(command)
            .map { accountPresenter.toDTO(it) }
            .map { it.toResponse() }
    }

    fun findAll(
        limit: Int,
        offset: Int
    ): Mono<AccountResponses> {
        val command = FindAllAccountCommand(limit, offset)

        return accountUseCase.findAll(command)
            .map { (count, accounts) ->
                accountPresenter.toDTO(
                    accounts,
                    count,
                    command.limit,
                    command.offset
                )
            }
            .map { dto ->
                AccountResponses(
                    dto.count,
                    dto.hasMore,
                    dto.data.map { it.toResponse() }
                )
            }
    }

    fun create(
        name: String,
        namePronunciation: String,
        email: String,
        password: String
    ): Mono<AccountResponse> {
        val command = CreateAccountCommand(
            name,
            namePronunciation,
            email,
            password
        )

        return accountUseCase.create(command)
            .map { accountPresenter.toDTO(it) }
            .map { it.toResponse() }
    }

    fun update(
        accountId: String,
        name: String?,
        namePronunciation: String?,
        email: String?,
        password: String?
    ): Mono<AccountResponse> {
        val command = UpdateAccountCommand(
            accountId,
            name,
            namePronunciation,
            email,
            password
        )

        return accountUseCase.update(command)
            .map { accountPresenter.toDTO(it) }
            .map { it.toResponse() }
    }

    fun delete(accountId: String): Mono<AccountResponse> {
        val command = DeleteAccountCommand(accountId)

        return accountUseCase.delete(command)
            .map { accountPresenter.toDTO(it) }
            .map { it.toResponse() }
    }

    private fun AccountDTO.toResponse() =
        AccountResponse.from(this)
}
