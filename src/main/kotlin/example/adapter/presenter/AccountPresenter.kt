package example.adapter.presenter

import example.domain.model.account.Account
import example.usecase.outputport.AccountUseCase
import example.usecase.outputport.dto.AccountDTO
import example.usecase.outputport.dto.PaginationDTO
import org.springframework.stereotype.Component

@Component
class AccountPresenter : AccountUseCase {

    override fun toDTO(account: Account): AccountDTO {
        return AccountDTO(
            account.accountId.id(),
            account.name.value(),
            account.namePronunciation.value(),
            account.email.value(),
            account.password.format(),
            account.createdAt.toEpochMilli(),
            account.deletedAt?.toEpochMilli(),
            account.updatedAt.toEpochMilli()
        )
    }

    override fun toDTO(accounts: List<Account>, count: Int, limit: Int, offset: Int): PaginationDTO<AccountDTO> {
        return PaginationDTO(
            count,
            limit,
            offset,
            accounts.map { toDTO(it) }
        )
    }
}
