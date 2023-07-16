package example.usecase.inputport.command.account

/**
 * すべてのアカウントを取得する際のコマンド情報。
 */
data class FindAllAccountCommand(
    val limit: Int,
    val offset: Int
)
