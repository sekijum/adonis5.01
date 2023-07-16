package example.usecase.inputport.command.account

/**
 * アカウントを削除する際のコマンド情報。
 */
data class DeleteAccountCommand(
    val accountId: String
)
