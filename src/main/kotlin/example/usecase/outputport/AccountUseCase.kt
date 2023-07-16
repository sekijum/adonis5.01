package example.usecase.outputport

import example.domain.model.account.Account
import example.usecase.outputport.dto.AccountDTO
import example.usecase.outputport.dto.PaginationDTO

interface AccountUseCase {

    fun toDTO(account: Account): AccountDTO

    fun toDTO(accounts: List<Account>, count: Int, limit: Int, offset: Int): PaginationDTO<AccountDTO>
}
