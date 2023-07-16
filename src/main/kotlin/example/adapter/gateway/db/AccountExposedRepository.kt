package example.adapter.gateway.db

import example.domain.model.account.*
import example.domain.repository.AccountRepository
import org.jetbrains.exposed.sql.*
import org.springframework.stereotype.Repository
import java.time.Instant

@Repository
class AccountExposedRepository : AccountRepository {

    override fun find(accountId: AccountId, lock: Boolean): Account =
        AccountTable.select { AccountTable.accountId eq accountId.id() }
            .run { if (lock) this.forUpdate() else this }
            .firstOrNull()
            ?.rowToModel()
            ?: throw AccountNotFoundException(accountId)

    override fun findAll(limit: Int, offset: Int): List<Account> =
        AccountTable.selectAll()
            .orderBy(AccountTable.createdAt)
            .limit(limit, offset = offset.toLong() * limit.toLong())
            .map { it.rowToModel() }

    override fun count(): Int =
        AccountTable.selectAll().count().toInt()

    override fun add(account: Account) {
        AccountTable.insert {
            it[accountId] = account.accountId.id()
            it[name] = account.name.value()
            it[namePronunciation] = account.namePronunciation.value()
            it[email] = account.email.value()
            it[password] = account.password.value()
            it[createdAt] = account.createdAt
            it[deletedAt] = account.deletedAt
            it[updatedAt] = account.updatedAt
        }
    }

    override fun set(account: Account) {
        AccountTable.update({ AccountTable.accountId eq account.accountId.id() }) {
            it[name] = account.name.value()
            it[namePronunciation] = account.namePronunciation.value()
            it[email] = account.email.value()
            it[password] = account.password.value()
            it[updatedAt] = account.updatedAt
        }
            .takeIf { it > 0 }
            ?: throw AccountUpdateFailedException(account.accountId)
    }

    override fun remove(account: Account) {
        AccountTable.update({ AccountTable.accountId eq account.accountId.id() }) {
            it[deletedAt] = account.deletedAt
            it[updatedAt] = account.updatedAt
        }
            .takeIf { it > 0 }
            ?: throw AccountUpdateFailedException(account.accountId)
    }

    private fun ResultRow.rowToModel(): Account =
        Account(
            AccountId.valueOf(this[AccountTable.accountId]),
            Name.valueOf(this[AccountTable.name]),
            NamePronunciation.valueOf(this[AccountTable.namePronunciation]),
            Email.valueOf(this[AccountTable.email]),
            Password.from(this[AccountTable.password]),
            this[AccountTable.createdAt],
            this[AccountTable.deletedAt],
            this[AccountTable.updatedAt]
        )
}

private object AccountTable : ExposedTable<Account>("account") {

    val accountId: Column<String> = varchar("account_id", length = 64)
    val name: Column<String> = varchar("name", length = 100)
    val namePronunciation: Column<String> = varchar("name_pronunciation", length = 100)
    val email: Column<String> = varchar("email", length = 100)
    val password: Column<String> = varchar("password", length = 64)
    val createdAt: Column<Instant> = instant("created_at")
    val deletedAt: Column<Instant?> = instant("deleted_at").nullable()
    val updatedAt: Column<Instant> = instant("updated_at")

    override val primaryKey = PrimaryKey(accountId)
}
