package example.usecase.inputport.command.account

/**
 * アカウントを取得する際のコマンド情報。
 */
data class FindAccountCommand(
    val accountId: String
)
