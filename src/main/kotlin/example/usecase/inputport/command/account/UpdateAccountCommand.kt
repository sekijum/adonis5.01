package example.usecase.inputport.command.account

/**
 * アカウントを更新する際のコマンド情報。
 */
data class UpdateAccountCommand(
    val accountId: String,
    val name: String?,
    val namePronunciation: String?,
    val email: String?,
    val password: String?
)
